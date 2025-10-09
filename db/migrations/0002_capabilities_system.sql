-- Migration: Convert from role-based to capabilities-based system
-- This migration preserves existing data while adding new capabilities

-- Add new capability columns
ALTER TABLE "profiles" ADD COLUMN "can_buy" boolean DEFAULT true NOT NULL;
ALTER TABLE "profiles" ADD COLUMN "can_sell" boolean DEFAULT false NOT NULL;
ALTER TABLE "profiles" ADD COLUMN "is_admin" boolean DEFAULT false NOT NULL;

-- Migrate existing role data to capabilities
UPDATE "profiles" SET 
  "can_buy" = true,
  "can_sell" = CASE WHEN "role" = 'seller' THEN true ELSE false END,
  "is_admin" = CASE WHEN "role" = 'admin' THEN true ELSE false END;

-- For admin users, enable both buying and selling
UPDATE "profiles" SET 
  "can_buy" = true,
  "can_sell" = true
WHERE "role" = 'admin';

-- Drop the old role column (we'll keep it for now for safety, can remove later)
-- ALTER TABLE "profiles" DROP COLUMN "role";