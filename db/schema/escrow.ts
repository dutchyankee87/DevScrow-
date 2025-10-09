import { pgEnum, pgTable, text, timestamp, uuid, integer, boolean, jsonb } from "drizzle-orm/pg-core"
import { customers } from "./customers"

export const userRole = pgEnum("user_role", ["buyer", "seller", "admin"])

export const listingStatus = pgEnum("listing_status", ["ACTIVE", "PAUSED", "SOLD", "ARCHIVED"])

export const escrowStatus = pgEnum("escrow_status", [
  "CREATED",    // Listing created, not yet purchased
  "RESERVED",   // NFT checked out by buyer
  "FUNDED",     // Payment bundled into escrow
  "DELIVERED",  // Seller has provided deliverable
  "COMPLETED",  // NFT fulfilled, payment released to seller
  "REFUNDED",   // Payment returned to buyer
  "DISPUTED",   // Dispute opened, requires admin resolution
  "EXPIRED"     // Checkout expired without payment
])

export const deliverableType = pgEnum("deliverable_type", ["FILE", "LINK", "TEXT"])

export const disputeStatus = pgEnum("dispute_status", [
  "OPEN", 
  "RESOLVED_RELEASE", 
  "RESOLVED_REFUND"
])

export const auditAction = pgEnum("audit_action", [
  "CREATE_LISTING",
  "CREATE_ESCROW", 
  "RESERVE_NFT",
  "FUND_ESCROW",
  "DELIVER",
  "COMPLETE",
  "REFUND",
  "DISPUTE_OPEN",
  "DISPUTE_RESOLVE",
  "EXPIRE"
])

// User profiles extending the customers table
export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => customers.userId).unique().notNull(),
  displayName: text("display_name").notNull(),
  
  // Capabilities-based system (replaces single role)
  canBuy: boolean("can_buy").default(true).notNull(),
  canSell: boolean("can_sell").default(false).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  
  devveWalletAddress: text("devve_wallet_address"),
  devveAccessToken: text("devve_access_token"),
  devveRefreshToken: text("devve_refresh_token"),
  reputation: integer("reputation").default(100).notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

// Service/product listings
export const listings = pgTable("listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  sellerId: text("seller_id").references(() => customers.userId).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  priceMinor: integer("price_minor").notNull(), // Price in smallest currency unit
  currency: text("currency").default("DEVVE").notNull(),
  deliveryTimeHours: integer("delivery_time_hours").default(24).notNull(),
  status: listingStatus("status").default("ACTIVE").notNull(),
  
  // Devve-specific fields
  devveNftId: text("devve_nft_id"), // NFT representing this listing
  devveCoinId: text("devve_coin_id"), // Payment token type
  
  // Metadata
  tags: jsonb("tags").$type<string[]>().default([]),
  requirements: text("requirements"),
  samples: jsonb("samples").$type<string[]>().default([]), // URLs to sample work
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

// Escrow transactions
export const escrows = pgTable("escrows", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id).notNull(),
  buyerId: text("buyer_id").references(() => customers.userId).notNull(),
  sellerId: text("seller_id").references(() => customers.userId).notNull(),
  
  status: escrowStatus("status").default("CREATED").notNull(),
  amountMinor: integer("amount_minor").notNull(),
  currency: text("currency").notNull(),
  
  // Devve transaction IDs for tracking
  devveCheckoutId: text("devve_checkout_id"),     // From NFT checkout
  devveBundleId: text("devve_bundle_id"),         // From escrow bundle
  devveFulfillTxId: text("devve_fulfill_tx_id"),  // From NFT fulfill
  devveRefundTxId: text("devve_refund_tx_id"),    // From escrow unbundle
  
  // Timing
  reservedUntil: timestamp("reserved_until"),
  deliveredAt: timestamp("delivered_at"),
  completedAt: timestamp("completed_at"),
  
  // Client-side tracking
  idempotencyKey: text("idempotency_key").unique().notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

// Digital deliverables
export const deliverables = pgTable("deliverables", {
  id: uuid("id").defaultRandom().primaryKey(),
  escrowId: uuid("escrow_id").references(() => escrows.id).notNull(),
  type: deliverableType("type").notNull(),
  
  // File uploads
  storageKey: text("storage_key"), // For FILE type
  filename: text("filename"),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  sha256Hash: text("sha256_hash"),
  
  // Link/text deliverables  
  url: text("url"),           // For LINK type
  content: text("content"),   // For TEXT type
  
  // Metadata
  notes: text("notes"),       // Seller's delivery notes
  
  createdAt: timestamp("created_at").defaultNow().notNull()
})

// Dispute management
export const disputes = pgTable("disputes", {
  id: uuid("id").defaultRandom().primaryKey(),
  escrowId: uuid("escrow_id").references(() => escrows.id).notNull(),
  openedBy: text("opened_by").references(() => customers.userId).notNull(),
  
  reason: text("reason").notNull(),
  description: text("description").notNull(),
  evidence: jsonb("evidence").$type<string[]>().default([]), // URLs to evidence files
  
  status: disputeStatus("status").default("OPEN").notNull(),
  resolutionNotes: text("resolution_notes"),
  resolvedBy: text("resolved_by").references(() => customers.userId),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at")
})

// Messaging system
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  escrowId: uuid("escrow_id").references(() => escrows.id).notNull(),
  senderId: text("sender_id").references(() => customers.userId).notNull(),
  
  body: text("body").notNull(),
  attachments: jsonb("attachments").$type<string[]>().default([]),
  isSystemMessage: boolean("is_system_message").default(false).notNull(),
  
  readBy: jsonb("read_by").$type<string[]>().default([]), // Array of user IDs who have read
  
  createdAt: timestamp("created_at").defaultNow().notNull()
})

// Audit trail
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  escrowId: uuid("escrow_id").references(() => escrows.id),
  listingId: uuid("listing_id").references(() => listings.id),
  
  actorId: text("actor_id").references(() => customers.userId), // null for system actions
  action: auditAction("action").notNull(),
  
  // Structured metadata
  metadata: jsonb("metadata").$type<{
    previousStatus?: string
    newStatus?: string
    transactionId?: string
    amount?: number
    reason?: string
    [key: string]: any
  }>().default({}),
  
  createdAt: timestamp("created_at").defaultNow().notNull()
})

// Reviews and ratings
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  escrowId: uuid("escrow_id").references(() => escrows.id).notNull(),
  reviewerId: text("reviewer_id").references(() => customers.userId).notNull(),
  revieweeId: text("reviewee_id").references(() => customers.userId).notNull(),
  
  rating: integer("rating").notNull(), // 1-5 stars
  title: text("title"),
  content: text("content"),
  
  isPublic: boolean("is_public").default(true).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

// Type exports
export type InsertProfile = typeof profiles.$inferInsert
export type SelectProfile = typeof profiles.$inferSelect

export type InsertListing = typeof listings.$inferInsert
export type SelectListing = typeof listings.$inferSelect

export type InsertEscrow = typeof escrows.$inferInsert
export type SelectEscrow = typeof escrows.$inferSelect

export type InsertDeliverable = typeof deliverables.$inferInsert
export type SelectDeliverable = typeof deliverables.$inferSelect

export type InsertDispute = typeof disputes.$inferInsert
export type SelectDispute = typeof disputes.$inferSelect

export type InsertMessage = typeof messages.$inferInsert
export type SelectMessage = typeof messages.$inferSelect

export type InsertAuditLog = typeof auditLogs.$inferInsert
export type SelectAuditLog = typeof auditLogs.$inferSelect

export type InsertReview = typeof reviews.$inferInsert
export type SelectReview = typeof reviews.$inferSelect