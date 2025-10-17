"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, Zap, Star, Clock, ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function MarketingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 py-20 sm:py-32">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute top-20 left-10 h-20 w-20 rounded-full bg-teal-200/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 h-16 w-16 rounded-full bg-emerald-200/30"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 h-12 w-12 rounded-full bg-slate-300/40"
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div 
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                  🚀 Powered by Devve Blockchain Technology
                </Badge>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-slate-700 to-teal-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: Infinity
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Escrow without trust
              </motion.span>{" "}
              — powered by mathematics
            </motion.h1>
            
            <motion.p 
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The world's first <strong>trustless escrow platform</strong> for digital work. 
              DevScrow uses cryptographic guarantees to ensure payment and delivery always happen together 
              or not at all — no intermediaries, no waiting, no disputes.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/marketplace">
                  <Button size="lg" className="w-full sm:w-auto group">
                    <Shield className="mr-2 h-5 w-5" />
                    Browse Marketplace
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/signup">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Join the waitlist
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                "Mathematical Trust",
                "Instant Atomic Settlement", 
                "Independence from Platforms"
              ].map((feature, i) => (
                <motion.div 
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </motion.div>
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Niches Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Mathematically Guaranteed Settlement
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Where payment and delivery always happen together, and nobody can cheat the system
            </motion.p>
          </motion.div>
          

          {/* Pain Points */}
          <motion.div 
            className="bg-gradient-to-r from-slate-50 to-teal-50 border border-slate-200 rounded-lg p-8 mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)",
              scale: 1.02 
            }}
          >
            <motion.h3 
              className="text-xl font-bold text-slate-800 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              DevScrow vs Traditional Escrow
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              {[
                {
                  emoji: "🔒",
                  title: "Trustless Model",
                  description: "Mathematical guarantee vs trusting intermediaries"
                },
                {
                  emoji: "⚡",
                  title: "Instant Settlement", 
                  description: "Atomic payment upon confirmation vs 5-14 day manual release"
                },
                {
                  emoji: "💯",
                  title: "Zero Disputes",
                  description: "Cryptographic certainty vs manual dispute resolution"
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  >
                    {item.emoji}
                  </motion.div>
                  <p className="text-slate-700 font-medium">{item.title}</p>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Four Key Messaging Pillars
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Built on DevvE's patented Contingent Transaction Sets (CTS) and DevvProtect
            </motion.p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Mathematical Trust",
                description: "Every transaction governed by DevvE's Contingent Transaction Sets — atomic, conditional logic that guarantees fair exchange without intermediaries.",
                color: "text-slate-700"
              },
              {
                icon: Zap,
                title: "Instant, Fair Settlements", 
                description: "Once delivery is confirmed, payment releases atomically and instantly — not in days or weeks.",
                color: "text-emerald-600"
              },
              {
                icon: Star,
                title: "NFT Ownership & Provenance",
                description: "Every service contract is minted as an NFT, representing provable ownership and completion — turning services into transferable digital assets.",
                color: "text-teal-600"
              },
              {
                icon: Clock,
                title: "Platform Independence",
                description: "Break free from centralized marketplaces. DevScrow works anywhere, giving you true ownership of your business relationships.",
                color: "text-amber-600"
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <Card className="text-center h-full transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className={`mx-auto h-12 w-12 ${feature.color}`} />
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              From project start to payment release in 4 simple steps
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Connect Wallet", desc: "Link your DevvE wallet address for self-custody transactions" },
              { step: "2", title: "Create/Find Service", desc: "Mint NFT representing service or browse existing offerings" },
              { step: "3", title: "Atomic Escrow", desc: "CTS locks payment & NFT together - mathematical guarantee" },
              { step: "4", title: "Instant Settlement", desc: "Delivery confirmation triggers atomic payment release" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTS Waitlist Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
              🚧 Coming Soon
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Contingent Transaction Sets
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              DevScrow's core functionality relies on DevvE's Contingent Transaction Sets (CTS) for atomic, 
              trustless escrow. While CTS is still in development, join our waitlist to be notified 
              when DevScrow launches with full CTS support.
            </p>
          </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-slate-700 to-teal-600 px-8 py-16 text-center text-white">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Get ready for trustless escrow.
            </h2>
            <p className="mt-4 text-lg opacity-90">
              No waiting, no middlemen, no disputes. Just fair, atomic trade powered by DevvE CTS.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/marketplace">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Shield className="mr-2 h-5 w-5" />
                  Preview Marketplace
                </Button>
              </Link>
              <Link href="#waitlist">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-white text-white hover:bg-white hover:text-blue-600 sm:w-auto"
                >
                  Join the waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
