"use server"

import { db } from "@/db"
import { ctsWaitlist, type InsertCtsWaitlist, type SelectCtsWaitlist } from "@/db/schema/waitlist"
import { eq } from "drizzle-orm"

export async function joinCtsWaitlist(
  data: Omit<InsertCtsWaitlist, "id" | "createdAt">
): Promise<{ isSuccess: boolean; message: string; data?: SelectCtsWaitlist }> {
  try {
    // Check if email already exists
    const existingEntry = await db.query.ctsWaitlist.findFirst({
      where: eq(ctsWaitlist.email, data.email)
    })

    if (existingEntry) {
      return { 
        isSuccess: false, 
        message: "You're already on the waitlist!" 
      }
    }

    const [newEntry] = await db
      .insert(ctsWaitlist)
      .values(data)
      .returning()

    if (!newEntry) {
      return { 
        isSuccess: false, 
        message: "Failed to join waitlist. Please try again." 
      }
    }

    return { 
      isSuccess: true, 
      message: "Successfully joined the CTS waitlist!", 
      data: newEntry 
    }
  } catch (error) {
    console.error("Error joining CTS waitlist:", error)
    return { 
      isSuccess: false, 
      message: "An error occurred. Please try again." 
    }
  }
}

export async function getCtsWaitlistCount(): Promise<number> {
  try {
    const count = await db
      .select({ count: db.$count(ctsWaitlist.id) })
      .from(ctsWaitlist)
    
    return count[0]?.count || 0
  } catch (error) {
    console.error("Error getting CTS waitlist count:", error)
    return 0
  }
}