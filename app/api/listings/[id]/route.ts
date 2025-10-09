import { NextRequest, NextResponse } from "next/server"
import { getListing, updateListingStatus } from "@/actions/listings"
import { z } from "zod"

const updateStatusSchema = z.object({
  status: z.enum(["ACTIVE", "PAUSED", "SOLD", "ARCHIVED"])
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const result = await getListing(resolvedParams.id)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in GET /api/listings/[id]:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const body = await request.json()
    const { status } = updateStatusSchema.parse(body)

    const result = await updateListingStatus(resolvedParams.id, status)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in PATCH /api/listings/[id]:", error)
    
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