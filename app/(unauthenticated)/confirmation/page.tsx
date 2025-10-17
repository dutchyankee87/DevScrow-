"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, Calendar, Users, ArrowRight, Twitter, Linkedin, MessageCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function WaitlistConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Celebratory floating elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Confetti-like elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 3 === 0 ? 'bg-emerald-400/60' : 
              i % 3 === 1 ? 'bg-teal-400/60' : 'bg-slate-400/60'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Large floating elements */}
        <motion.div
          className="absolute top-20 right-10 h-24 w-24 rounded-full bg-gradient-to-r from-emerald-200/30 to-teal-200/30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-16 h-20 w-20 rounded-full bg-gradient-to-r from-teal-200/40 to-emerald-200/40"
          animate={{
            scale: [1.1, 1, 1.1],
            y: [0, -25, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CheckCircle className="mx-auto h-20 w-20 text-green-600" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="mt-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.2 },
              y: { duration: 0.5, delay: 0.2 },
              backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            Welcome to the Future!
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground mt-4 text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            You're now on the DevScrow waitlist. You'll be among the first to experience zero-risk digital work.
          </motion.p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Mail,
                title: "Check Your Email",
                description: "We've sent you a welcome email with next steps and exclusive updates.",
                color: "text-slate-600",
                bgColor: "hover:bg-slate-50"
              },
              {
                icon: Calendar,
                title: "Launch Q1 2026", 
                description: "Beta access begins Q1 2026. You'll get 7 days early access.",
                color: "text-teal-600",
                bgColor: "hover:bg-teal-50"
              },
              {
                icon: Users,
                title: "Position #848",
                description: "You're among the first 850 members. Premium placement guaranteed.",
                color: "text-emerald-600", 
                bgColor: "hover:bg-emerald-50"
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className={`rounded-lg border bg-card p-6 transition-all duration-300 ${item.bgColor}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className={`mx-auto h-8 w-8 ${item.color}`} />
                </motion.div>
                <motion.h3 
                  className="mt-4 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold">What happens next?</h2>
            <div className="text-left space-y-3 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                <span className="text-sm">Email confirmation sent to your inbox</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-sm">Weekly updates on development progress</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-600" />
                <span className="text-sm">Early beta invitation (Q1 2026)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-600" />
                <span className="text-sm">Premium marketplace positioning</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button asChild size="lg">
              <Link href="/" className="flex items-center gap-2">
                Back to Home <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about" className="flex items-center gap-2">
                Learn More <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <p className="text-muted-foreground text-sm mb-4">Share the future of digital work:</p>
            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20DevScrow%20waitlist%20%E2%80%93%20the%20future%20of%20zero-risk%20digital%20work%20is%20coming!%20%F0%9F%9A%80" target="_blank">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://linkedin.com/sharing/share-offsite/?url=devscrow.com" target="_blank">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
