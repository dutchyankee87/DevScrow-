import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { reserveEscrow, fundEscrow, deliverToEscrow, completeEscrow, openDispute } from "@/actions/escrows"
import { z } from "zod"

const actionSchema = z.object({
  action: z.enum(["reserve", "fund", "deliver", "complete", "dispute"])
})

const deliverSchema = z.object({
  action: z.literal("deliver"),
  type: z.enum(["FILE", "LINK", "TEXT"]),
  storageKey: z.string().optional(),
  filename: z.string().optional(),
  url: z.string().optional(),
  content: z.string().optional(),
  notes: z.string().optional()
})

const disputeSchema = z.object({
  action: z.literal("dispute"),
  reason: z.string().min(1),
  description: z.string().min(1)
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const body = await request.json()
    const { action } = actionSchema.parse(body)

    switch (action) {
      case "reserve":
        const reserveResult = await reserveEscrow(resolvedParams.id)
        return NextResponse.json(reserveResult)

      case "fund":
        const fundResult = await fundEscrow(resolvedParams.id)
        return NextResponse.json(fundResult)

      case "deliver":
        const deliverData = deliverSchema.parse(body)
        const deliverResult = await deliverToEscrow(resolvedParams.id, {
          type: deliverData.type,
          storageKey: deliverData.storageKey,
          filename: deliverData.filename,
          url: deliverData.url,
          content: deliverData.content,
          notes: deliverData.notes
        })
        return NextResponse.json(deliverResult)

      case "complete":
        const completeResult = await completeEscrow(resolvedParams.id)
        return NextResponse.json(completeResult)

      case "dispute":
        const disputeData = disputeSchema.parse(body)
        const disputeResult = await openDispute(resolvedParams.id, disputeData.reason, disputeData.description)
        return NextResponse.json(disputeResult)

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        )
    }
  } catch (error) {
    const resolvedParams = await params
    console.error(`Error in POST /api/escrows/${resolvedParams.id}:`, error)
    
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