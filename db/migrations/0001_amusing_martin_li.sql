CREATE TYPE "public"."audit_action" AS ENUM('CREATE_LISTING', 'CREATE_ESCROW', 'RESERVE_NFT', 'FUND_ESCROW', 'DELIVER', 'COMPLETE', 'REFUND', 'DISPUTE_OPEN', 'DISPUTE_RESOLVE', 'EXPIRE');--> statement-breakpoint
CREATE TYPE "public"."deliverable_type" AS ENUM('FILE', 'LINK', 'TEXT');--> statement-breakpoint
CREATE TYPE "public"."dispute_status" AS ENUM('OPEN', 'RESOLVED_RELEASE', 'RESOLVED_REFUND');--> statement-breakpoint
CREATE TYPE "public"."escrow_status" AS ENUM('CREATED', 'RESERVED', 'FUNDED', 'DELIVERED', 'COMPLETED', 'REFUNDED', 'DISPUTED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('ACTIVE', 'PAUSED', 'SOLD', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('buyer', 'seller', 'admin');--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"escrow_id" uuid,
	"listing_id" uuid,
	"actor_id" text,
	"action" "audit_action" NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deliverables" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"escrow_id" uuid NOT NULL,
	"type" "deliverable_type" NOT NULL,
	"storage_key" text,
	"filename" text,
	"file_size" integer,
	"mime_type" text,
	"sha256_hash" text,
	"url" text,
	"content" text,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "disputes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"escrow_id" uuid NOT NULL,
	"opened_by" text NOT NULL,
	"reason" text NOT NULL,
	"description" text NOT NULL,
	"evidence" jsonb DEFAULT '[]'::jsonb,
	"status" "dispute_status" DEFAULT 'OPEN' NOT NULL,
	"resolution_notes" text,
	"resolved_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "escrows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"buyer_id" text NOT NULL,
	"seller_id" text NOT NULL,
	"status" "escrow_status" DEFAULT 'CREATED' NOT NULL,
	"amount_minor" integer NOT NULL,
	"currency" text NOT NULL,
	"devve_checkout_id" text,
	"devve_bundle_id" text,
	"devve_fulfill_tx_id" text,
	"devve_refund_tx_id" text,
	"reserved_until" timestamp,
	"delivered_at" timestamp,
	"completed_at" timestamp,
	"idempotency_key" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "escrows_idempotency_key_unique" UNIQUE("idempotency_key")
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"price_minor" integer NOT NULL,
	"currency" text DEFAULT 'DEVVE' NOT NULL,
	"delivery_time_hours" integer DEFAULT 24 NOT NULL,
	"status" "listing_status" DEFAULT 'ACTIVE' NOT NULL,
	"devve_nft_id" text,
	"devve_coin_id" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"requirements" text,
	"samples" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"escrow_id" uuid NOT NULL,
	"sender_id" text NOT NULL,
	"body" text NOT NULL,
	"attachments" jsonb DEFAULT '[]'::jsonb,
	"is_system_message" boolean DEFAULT false NOT NULL,
	"read_by" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"display_name" text NOT NULL,
	"role" "user_role" DEFAULT 'buyer' NOT NULL,
	"devve_wallet_address" text,
	"devve_access_token" text,
	"devve_refresh_token" text,
	"reputation" integer DEFAULT 100 NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"bio" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"escrow_id" uuid NOT NULL,
	"reviewer_id" text NOT NULL,
	"reviewee_id" text NOT NULL,
	"rating" integer NOT NULL,
	"title" text,
	"content" text,
	"is_public" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_escrow_id_escrows_id_fk" FOREIGN KEY ("escrow_id") REFERENCES "public"."escrows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_customers_user_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deliverables" ADD CONSTRAINT "deliverables_escrow_id_escrows_id_fk" FOREIGN KEY ("escrow_id") REFERENCES "public"."escrows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_escrow_id_escrows_id_fk" FOREIGN KEY ("escrow_id") REFERENCES "public"."escrows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_opened_by_customers_user_id_fk" FOREIGN KEY ("opened_by") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_resolved_by_customers_user_id_fk" FOREIGN KEY ("resolved_by") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "escrows" ADD CONSTRAINT "escrows_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "escrows" ADD CONSTRAINT "escrows_buyer_id_customers_user_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "escrows" ADD CONSTRAINT "escrows_seller_id_customers_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_seller_id_customers_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_escrow_id_escrows_id_fk" FOREIGN KEY ("escrow_id") REFERENCES "public"."escrows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_customers_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_customers_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_escrow_id_escrows_id_fk" FOREIGN KEY ("escrow_id") REFERENCES "public"."escrows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_customers_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewee_id_customers_user_id_fk" FOREIGN KEY ("reviewee_id") REFERENCES "public"."customers"("user_id") ON DELETE no action ON UPDATE no action;