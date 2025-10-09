import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-05-28.basil",
  appInfo: {
    name: "DevScrow",
    version: "1.0.0"
  }
})
