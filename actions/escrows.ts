"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { escrows, listings, profiles, auditLogs, deliverables, disputes } from "@/db/schema/escrow"
import { eq, and, or } from "drizzle-orm"
import { randomUUID } from "crypto"
import { devveClient } from "@/lib/devve"
import { revalidatePath } from "next/cache"

export interface CreateEscrowData {
  listingId: string
  idempotencyKey?: string
}

export async function createEscrow(data: CreateEscrowData) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated to create escrow")
  }

  const idempotencyKey = data.idempotencyKey || randomUUID()

  // Check for existing escrow with same idempotency key
  const existingEscrow = await db.query.escrows.findFirst({
    where: eq(escrows.idempotencyKey, idempotencyKey)
  })

  if (existingEscrow) {
    return { success: true, escrow: existingEscrow }
  }

  try {
    // Get listing details
    const listing = await db.query.listings.findFirst({
      where: eq(listings.id, data.listingId)
    })

    if (!listing) {
      throw new Error("Listing not found")
    }

    if (listing.status !== "ACTIVE") {
      throw new Error("Listing is not available for purchase")
    }

    if (listing.sellerId === userId) {
      throw new Error("Cannot purchase your own listing")
    }

    // Get buyer profile to get wallet address
    const buyerProfile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId)
    })

    if (!buyerProfile?.devveWalletAddress) {
      throw new Error("Buyer must have a connected Devve wallet")
    }

    // Create escrow record
    const [escrow] = await db.insert(escrows).values({
      listingId: data.listingId,
      buyerId: userId,
      sellerId: listing.sellerId,
      status: "CREATED",
      amountMinor: listing.priceMinor,
      currency: listing.currency,
      idempotencyKey
    }).returning()

    // Log the action
    await db.insert(auditLogs).values({
      escrowId: escrow.id,
      listingId: data.listingId,
      actorId: userId,
      action: "CREATE_ESCROW",
      metadata: {
        amount: listing.priceMinor,
        currency: listing.currency
      }
    })

    revalidatePath("/dashboard")

    return { success: true, escrow }
  } catch (error) {
    console.error("Error creating escrow:", error)
    throw new Error("Failed to create escrow")
  }
}

export async function reserveEscrow(escrowId: string) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    const escrow = await db.query.escrows.findFirst({
      where: eq(escrows.id, escrowId),
      with: {
        // We'll add relations later
      }
    })

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    if (escrow.buyerId !== userId) {
      throw new Error("Only the buyer can reserve escrow")
    }

    if (escrow.status !== "CREATED") {
      throw new Error("Escrow cannot be reserved in current state")
    }

    // Get listing details
    const listing = await db.query.listings.findFirst({
      where: eq(listings.id, escrow.listingId)
    })

    if (!listing?.devveNftId) {
      throw new Error("Listing NFT not found")
    }

    // Get buyer profile
    const buyerProfile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId)
    })

    if (!buyerProfile?.devveWalletAddress) {
      throw new Error("Buyer wallet not found")
    }

    // Checkout NFT on Devve (reserves it)
    const clientId = devveClient.generateClientId()
    const checkout = await devveClient.checkoutNFT({
      nftId: listing.devveNftId,
      buyerAddress: buyerProfile.devveWalletAddress,
      reservationDuration: 60, // 1 hour
      clientId,
      apikey: process.env.DEVVE_API_KEY!
    })

    // Update escrow status
    const reservedUntil = new Date(checkout.reservedUntil)
    await db.update(escrows)
      .set({ 
        status: "RESERVED",
        devveCheckoutId: checkout.checkoutId,
        reservedUntil,
        updatedAt: new Date()
      })
      .where(eq(escrows.id, escrowId))

    // Log the action
    await db.insert(auditLogs).values({
      escrowId,
      actorId: userId,
      action: "RESERVE_NFT",
      metadata: {
        checkoutId: checkout.checkoutId,
        reservedUntil: checkout.reservedUntil
      }
    })

    revalidatePath("/dashboard")

    return { success: true, checkout }
  } catch (error) {
    console.error("Error reserving escrow:", error)
    throw new Error("Failed to reserve escrow")
  }
}

export async function fundEscrow(escrowId: string) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    const escrow = await db.query.escrows.findFirst({
      where: eq(escrows.id, escrowId)
    })

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    if (escrow.buyerId !== userId) {
      throw new Error("Only the buyer can fund escrow")
    }

    if (escrow.status !== "RESERVED") {
      throw new Error("Escrow must be reserved before funding")
    }

    // Get listing details for coin ID
    const listing = await db.query.listings.findFirst({
      where: eq(listings.id, escrow.listingId)
    })

    if (!listing?.devveCoinId) {
      throw new Error("Payment token not specified")
    }

    // Bundle payment into escrow on Devve
    const clientId = devveClient.generateClientId()
    const bundle = await devveClient.bundleEscrow({
      tokensCoinId: listing.devveCoinId,
      tokensAmount: escrow.amountMinor,
      clientId,
      apikey: process.env.DEVVE_API_KEY!
    })

    // Update escrow status
    await db.update(escrows)
      .set({ 
        status: "FUNDED",
        devveBundleId: bundle.bundleId,
        updatedAt: new Date()
      })
      .where(eq(escrows.id, escrowId))

    // Log the action
    await db.insert(auditLogs).values({
      escrowId,
      actorId: userId,
      action: "FUND_ESCROW",
      metadata: {
        bundleId: bundle.bundleId,
        amount: escrow.amountMinor,
        currency: escrow.currency
      }
    })

    revalidatePath("/dashboard")

    return { success: true, bundle }
  } catch (error) {
    console.error("Error funding escrow:", error)
    throw new Error("Failed to fund escrow")
  }
}

export async function deliverToEscrow(escrowId: string, deliveryData: {
  type: "FILE" | "LINK" | "TEXT"
  storageKey?: string
  filename?: string
  url?: string
  content?: string
  notes?: string
}) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    const escrow = await db.query.escrows.findFirst({
      where: eq(escrows.id, escrowId)
    })

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    if (escrow.sellerId !== userId) {
      throw new Error("Only the seller can deliver to escrow")
    }

    if (escrow.status !== "FUNDED") {
      throw new Error("Escrow must be funded before delivery")
    }

    // Create deliverable record
    await db.insert(deliverables).values({
      escrowId,
      type: deliveryData.type,
      storageKey: deliveryData.storageKey,
      filename: deliveryData.filename,
      url: deliveryData.url,
      content: deliveryData.content,
      notes: deliveryData.notes
    })

    // Update escrow status
    await db.update(escrows)
      .set({ 
        status: "DELIVERED",
        deliveredAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(escrows.id, escrowId))

    // Log the action
    await db.insert(auditLogs).values({
      escrowId,
      actorId: userId,
      action: "DELIVER",
      metadata: {
        deliveryType: deliveryData.type,
        notes: deliveryData.notes
      }
    })

    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error delivering to escrow:", error)
    throw new Error("Failed to deliver to escrow")
  }
}

export async function completeEscrow(escrowId: string) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    const escrow = await db.query.escrows.findFirst({
      where: eq(escrows.id, escrowId)
    })

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    if (escrow.buyerId !== userId) {
      throw new Error("Only the buyer can complete escrow")
    }

    if (escrow.status !== "DELIVERED") {
      throw new Error("Escrow must have delivery before completion")
    }

    if (!escrow.devveCheckoutId || !escrow.devveBundleId) {
      throw new Error("Missing Devve transaction IDs")
    }

    // Fulfill NFT on Devve (atomic transfer + payment release)
    const clientId = devveClient.generateClientId()
    const fulfillTx = await devveClient.fulfillNFT({
      checkoutId: escrow.devveCheckoutId,
      bundleId: escrow.devveBundleId,
      clientId,
      apikey: process.env.DEVVE_API_KEY!
    })

    // Update escrow status
    await db.update(escrows)
      .set({ 
        status: "COMPLETED",
        devveFulfillTxId: fulfillTx.transactionId,
        completedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(escrows.id, escrowId))

    // Log the action
    await db.insert(auditLogs).values({
      escrowId,
      actorId: userId,
      action: "COMPLETE",
      metadata: {
        fulfillTxId: fulfillTx.transactionId
      }
    })

    revalidatePath("/dashboard")

    return { success: true, transaction: fulfillTx }
  } catch (error) {
    console.error("Error completing escrow:", error)
    throw new Error("Failed to complete escrow")
  }
}

export async function openDispute(escrowId: string, reason: string, description: string) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    const escrow = await db.query.escrows.findFirst({
      where: eq(escrows.id, escrowId)
    })

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    if (escrow.buyerId !== userId && escrow.sellerId !== userId) {
      throw new Error("Only buyer or seller can open dispute")
    }

    if (!["FUNDED", "DELIVERED"].includes(escrow.status)) {
      throw new Error("Cannot dispute escrow in current state")
    }

    // Create dispute record
    await db.insert(disputes).values({
      escrowId,
      openedBy: userId,
      reason,
      description
    })

    // Update escrow status
    await db.update(escrows)
      .set({ 
        status: "DISPUTED",
        updatedAt: new Date()
      })
      .where(eq(escrows.id, escrowId))

    // Log the action
    await db.insert(auditLogs).values({
      escrowId,
      actorId: userId,
      action: "DISPUTE_OPEN",
      metadata: {
        reason,
        description
      }
    })

    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error opening dispute:", error)
    throw new Error("Failed to open dispute")
  }
}

export async function getMyEscrows(role?: "buyer" | "seller") {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    const whereClause = role === "buyer" 
      ? eq(escrows.buyerId, userId)
      : role === "seller"
      ? eq(escrows.sellerId, userId)
      : or(eq(escrows.buyerId, userId), eq(escrows.sellerId, userId))

    const results = await db.query.escrows.findMany({
      where: whereClause,
      with: {
        // We'll add relations later
      }
    })

    return { success: true, escrows: results }
  } catch (error) {
    console.error("Error fetching escrows:", error)
    throw new Error("Failed to fetch escrows")
  }
}