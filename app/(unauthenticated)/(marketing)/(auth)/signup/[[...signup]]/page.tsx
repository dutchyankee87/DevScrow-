"use client"

import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Star, Users, Shield, Zap, CheckCircle, DollarSign, Clock, AlertTriangle, Mail, Users2, TrendingUp, Calendar } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { motion } from "framer-motion"

export default function WaitlistPage() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute top-10 right-10 h-32 w-32 rounded-full bg-gradient-to-r from-slate-200/30 to-teal-200/30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 h-24 w-24 rounded-full bg-gradient-to-r from-emerald-200/40 to-slate-200/40"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-gradient-to-r from-teal-300/50 to-emerald-300/50"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 0.8, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </motion.div>

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
              className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-700 to-teal-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.1 },
                y: { duration: 0.5, delay: 0.1 },
                backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              Be First to the Future of Digital Work
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join the exclusive waitlist for DevScrow - the first marketplace with mathematically guaranteed payments. 
              Early access members get premium positioning and exclusive benefits.
            </motion.p>
          </div>

          {/* Waitlist Benefits grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: TrendingUp,
                title: "Early Access",
                desc: "Be among the first 100 users"
              },
              {
                icon: DollarSign,
                title: "Premium Positioning",
                desc: "Top marketplace placement"
              },
              {
                icon: Calendar,
                title: "Launch Q1 2026",
                desc: "Beta access this quarter"
              },
              {
                icon: Users2,
                title: "Exclusive Community",
                desc: "Direct founder access"
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

          {/* Limited Spots */}
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
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Limited Early Access</p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                Only 100 spots available for our exclusive beta launch. Join now to secure your place in the future of digital work.
              </p>
            </div>
          </motion.div>

          {/* Founder-backed guarantee */}
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
            <p className="text-sm font-medium">Founder-Backed Early Access Promise</p>
          </motion.div>

          {/* Urgency callout */}
          <motion.div
            className="flex items-start gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Don't Miss Out</p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                Join 847+ professionals already on the waitlist. Be part of the revolutionary marketplace launching Q1 2026.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Waitlist form */}
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
            <h2 className="mb-2 text-2xl font-semibold">Join the waitlist</h2>
            <p className="text-muted-foreground text-sm">
              Secure your spot for early access to DevScrow. Be among the first to experience zero-risk digital work.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            {/* Glowing border effect */}
            <motion.div
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-slate-600/20 to-teal-600/20 blur-sm"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative">
              <SignUp
                forceRedirectUrl="/confirmation"
                signInUrl="/login"
                appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </div>
  )
}
