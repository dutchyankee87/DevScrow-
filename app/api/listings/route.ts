import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { createListing, getListings } from "@/actions/listings"
import { z } from "zod"

const createListingSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  category: z.string().min(1).max(100),
  priceMinor: z.number().positive(),
  currency: z.string().default("DEVVE"),
  deliveryTimeHours: z.number().positive().default(24),
  requirements: z.string().optional(),
  tags: z.array(z.string()).default([])
})

const getListingsSchema = z.object({
  category: z.string().optional(),
  sellerId: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0)
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = createListingSchema.parse(body)

    const result = await createListing(data)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in POST /api/listings:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = {
      category: searchParams.get("category") || undefined,
      sellerId: searchParams.get("sellerId") || undefined,
      limit: parseInt(searchParams.get("limit") || "20"),
      offset: parseInt(searchParams.get("offset") || "0")
    }

    const data = getListingsSchema.parse(params)
    const result = await getListings(data)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in GET /api/listings:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid parameters", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}