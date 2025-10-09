"use client"

import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Star, Users, Shield, Zap, CheckCircle, DollarSign, Clock, AlertTriangle } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SignUpPage() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left side - Benefits */}
        <motion.div
          className="hidden space-y-8 lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <motion.h1
              className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join the Zero-Risk Revolution
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Start earning with mathematically guaranteed escrow. No more payment disputes,
              chargebacks, or platform holds. Get paid instantly when you deliver.
            </motion.p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Shield,
                title: "Zero Counterparty Risk",
                desc: "Mathematical guarantees"
              },
              {
                icon: Zap,
                title: "Instant Settlement",
                desc: "Get paid immediately"
              },
              {
                icon: DollarSign,
                title: "Premium Services",
                desc: "$500+ projects only"
              },
              {
                icon: Users,
                title: "Verified Professionals",
                desc: "Curated marketplace"
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-lg border p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.4 + i * 0.1
                  }}
                >
                  <feature.icon className="text-primary mb-2 h-8 w-8" />
                </motion.div>
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="text-muted-foreground text-xs">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* MVP Disclaimer */}
          <motion.div
            className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex mt-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                    delay: 0.8 + i * 0.05
                  }}
                >
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">MVP Disclaimer</p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                This is a Minimum Viable Product for demonstration purposes. Features and functionality are limited and subject to change.
              </p>
            </div>
          </motion.div>

          {/* Zero risk guarantee */}
          <motion.div
            className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 15px rgba(34, 197, 94, 0.2)"
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </motion.div>
            <p className="text-sm font-medium">Zero Counterparty Risk Guaranteed</p>
          </motion.div>

          {/* Problem callout */}
          <motion.div
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">Tired of Platform Drama?</p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                No more 14-day holds, payment disputes, or chargebacks. Join professionals earning $500+ with guaranteed payments.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Sign up form */}
        <motion.div
          className="mx-auto w-full max-w-md lg:mx-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="mb-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-2 text-2xl font-semibold">Join DevScrow</h2>
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Sign in here
                </Link>
              </motion.span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SignUp
              forceRedirectUrl="/dashboard"
              signInUrl="/login"
              appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
            />
          </motion.div>
        </motion.div>
      </div>
      </div>
    </div>
  )
}
