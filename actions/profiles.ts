"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { profiles } from "@/db/schema/escrow"
import { eq } from "drizzle-orm"
import { devveClient } from "@/lib/devve"
import { revalidatePath } from "next/cache"

export interface CreateProfileData {
  displayName: string
  canBuy: boolean
  canSell: boolean
  bio?: string
}

export interface ConnectDevveWalletData {
  username: string
  password: string
}

export async function createOrUpdateProfile(data: CreateProfileData) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated to create profile")
  }

  try {
    // Check if profile exists
    const existingProfile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId)
    })

    if (existingProfile) {
      // Update existing profile
      await db.update(profiles)
        .set({
          displayName: data.displayName,
          canBuy: data.canBuy,
          canSell: data.canSell,
          bio: data.bio,
          updatedAt: new Date()
        })
        .where(eq(profiles.userId, userId))

      revalidatePath("/dashboard")
      return { success: true, profile: { ...existingProfile, ...data } }
    } else {
      // Create new profile
      const [profile] = await db.insert(profiles).values({
        userId,
        displayName: data.displayName,
        canBuy: data.canBuy,
        canSell: data.canSell,
        bio: data.bio
      }).returning()

      revalidatePath("/dashboard")
      return { success: true, profile }
    }
  } catch (error) {
    console.error("Error creating/updating profile:", error)
    throw new Error("Failed to create profile")
  }
}

export async function connectDevveWallet(data: ConnectDevveWalletData) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    // Try to login to Devve with provided credentials
    const authResult = await devveClient.login({
      usernameOrEmail: data.username,
      password: data.password
    })

    // Get wallet balance to verify connection
    const balances = await devveClient.getWalletBalance({
      walletAddress: data.username, // Assuming username is wallet address for now
      apikey: process.env.DEVVE_API_KEY!
    })

    // Update profile with Devve wallet info
    await db.update(profiles)
      .set({
        devveWalletAddress: data.username,
        devveAccessToken: authResult.accessToken,
        devveRefreshToken: authResult.refreshToken,
        isVerified: true,
        updatedAt: new Date()
      })
      .where(eq(profiles.userId, userId))

    revalidatePath("/dashboard")

    return { 
      success: true, 
      walletAddress: data.username,
      balances 
    }
  } catch (error) {
    console.error("Error connecting Devve wallet:", error)
    throw new Error("Failed to connect Devve wallet. Please check your credentials.")
  }
}

export async function createDevveAccount(data: {
  username: string
  email: string
  fullName: string
  password: string
  phone?: string
}) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    // Register new account on Devve
    const authResult = await devveClient.register(data)

    // Update profile with new Devve wallet info
    await db.update(profiles)
      .set({
        devveWalletAddress: data.username,
        devveAccessToken: authResult.accessToken,
        devveRefreshToken: authResult.refreshToken,
        isVerified: true,
        updatedAt: new Date()
      })
      .where(eq(profiles.userId, userId))

    revalidatePath("/dashboard")

    return { 
      success: true, 
      walletAddress: data.username,
      authResult 
    }
  } catch (error) {
    console.error("Error creating Devve account:", error)
    throw new Error("Failed to create Devve account")
  }
}

export async function getProfile(userId?: string) {
  const { userId: currentUserId } = await auth()
  const targetUserId = userId || currentUserId

  if (!targetUserId) {
    throw new Error("User ID required")
  }

  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, targetUserId)
    })

    return { success: true, profile }
  } catch (error) {
    console.error("Error fetching profile:", error)
    throw new Error("Failed to fetch profile")
  }
}

export async function getDevveBalance() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Must be authenticated")
  }

  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId)
    })

    if (!profile?.devveWalletAddress) {
      throw new Error("No Devve wallet connected")
    }

    const balances = await devveClient.getWalletBalance({
      walletAddress: profile.devveWalletAddress,
      apikey: process.env.DEVVE_API_KEY!
    })

    return { success: true, balances }
  } catch (error) {
    console.error("Error fetching Devve balance:", error)
    throw new Error("Failed to fetch wallet balance")
  }
}