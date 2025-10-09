"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { listings, profiles, auditLogs } from "@/db/schema/escrow"
import { eq, and, desc } from "drizzle-orm"
import { randomUUID } from "crypto"
import { devveClient } from "@/lib/devve"
import { revalidatePath } from "next/cache"

export interface CreateListingData {
  title: string
  description: string
  category: string
  priceMinor: number
  currency: string
  deliveryTimeHours: number
  requirements?: string
  tags: string[]
}

export async function createListing(data: CreateListingData) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated to create listings")
  }

  // Check if user has selling capability
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId)
  })

  if (!profile || !profile.canSell) {
    throw new Error("Must have selling capability to create listings")
  }

  try {
    // Create NFT on Devve to represent this listing
    const clientId = devveClient.generateClientId()
    const nftResult = await devveClient.createNFT({
      metadata: {
        title: data.title,
        description: data.description,
        properties: {
          category: data.category,
          price: data.priceMinor,
          currency: data.currency,
          deliveryTimeHours: data.deliveryTimeHours,
          sellerId: userId
        }
      },
      clientId,
      apikey: process.env.DEVVE_API_KEY!
    })

    // Create listing in database
    const [listing] = await db.insert(listings).values({
      sellerId: userId,
      title: data.title,
      description: data.description,
      category: data.category,
      priceMinor: data.priceMinor,
      currency: data.currency,
      deliveryTimeHours: data.deliveryTimeHours,
      requirements: data.requirements,
      tags: data.tags,
      devveNftId: nftResult.nftId,
      devveCoinId: "17293822569102704641" // Test coin ID from Devve docs
    }).returning()

    // Log the action
    await db.insert(auditLogs).values({
      listingId: listing.id,
      actorId: userId,
      action: "CREATE_LISTING",
      metadata: {
        nftId: nftResult.nftId,
        transactionId: nftResult.transactionId
      }
    })

    revalidatePath("/listings")
    revalidatePath("/dashboard")

    return { success: true, listing }
  } catch (error) {
    console.error("Error creating listing:", error)
    throw new Error("Failed to create listing")
  }
}

export async function getListings({
  category,
  sellerId,
  limit = 20,
  offset = 0
}: {
  category?: string
  sellerId?: string
  limit?: number
  offset?: number
} = {}) {
  try {
    let query = db.query.listings.findMany({
      with: {
        // We'll add relations later
      },
      where: and(
        eq(listings.status, "ACTIVE"),
        category ? eq(listings.category, category) : undefined,
        sellerId ? eq(listings.sellerId, sellerId) : undefined
      ),
      orderBy: desc(listings.createdAt),
      limit,
      offset
    })

    const results = await query

    return { success: true, listings: results }
  } catch (error) {
    console.error("Error fetching listings:", error)
    throw new Error("Failed to fetch listings")
  }
}

export async function getListing(id: string) {
  try {
    const listing = await db.query.listings.findFirst({
      where: eq(listings.id, id),
      with: {
        // We'll add relations later
      }
    })

    if (!listing) {
      throw new Error("Listing not found")
    }

    return { success: true, listing }
  } catch (error) {
    console.error("Error fetching listing:", error)
    throw new Error("Failed to fetch listing")
  }
}

export async function updateListingStatus(id: string, status: "ACTIVE" | "PAUSED" | "SOLD" | "ARCHIVED") {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    const listing = await db.query.listings.findFirst({
      where: eq(listings.id, id)
    })

    if (!listing) {
      throw new Error("Listing not found")
    }

    if (listing.sellerId !== userId) {
      throw new Error("Only the seller can update listing status")
    }

    await db.update(listings)
      .set({ 
        status,
        updatedAt: new Date()
      })
      .where(eq(listings.id, id))

    revalidatePath("/listings")
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error updating listing:", error)
    throw new Error("Failed to update listing")
  }
}