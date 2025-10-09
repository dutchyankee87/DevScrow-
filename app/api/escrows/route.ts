import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { createEscrow, getMyEscrows } from "@/actions/escrows"
import { z } from "zod"

const createEscrowSchema = z.object({
  listingId: z.string().uuid(),
  idempotencyKey: z.string().optional()
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
    const data = createEscrowSchema.parse(body)

    const result = await createEscrow(data)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in POST /api/escrows:", error)
    
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
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role") as "buyer" | "seller" | undefined

    const result = await getMyEscrows(role)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in GET /api/escrows:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}