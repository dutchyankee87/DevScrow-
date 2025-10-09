import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, Zap, Star, Clock, ArrowRight, CheckCircle } from "lucide-react"

export default function MarketingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                🚀 Powered by Devve Blockchain Technology
              </Badge>
            </div>
            
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Escrow without trust
              </span>{" "}
              — powered by mathematics
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              The world's first <strong>trustless escrow platform</strong> for digital work. 
              DevScrow uses cryptographic guarantees to ensure payment and delivery always happen together 
              or not at all — no intermediaries, no waiting, no disputes.
            </p>
            
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/marketplace">
                <Button size="lg" className="w-full sm:w-auto">
                  <Shield className="mr-2 h-5 w-5" />
                  Browse Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Start Selling
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Mathematical Trust
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Instant Atomic Settlement
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Independence from Platforms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Niches Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Mathematically Guaranteed Settlement
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Where payment and delivery always happen together, and nobody can cheat the system
            </p>
          </div>
          

          {/* Pain Points */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 mb-16">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
              DevScrow vs Traditional Escrow
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">🔒</div>
                <p className="text-blue-700 font-medium">Trustless Model</p>
                <p className="text-blue-600 text-sm">Mathematical guarantee vs trusting intermediaries</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⚡</div>
                <p className="text-blue-700 font-medium">Instant Settlement</p>
                <p className="text-blue-600 text-sm">Atomic payment upon confirmation vs 5-14 day manual release</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🏛️</div>
                <p className="text-blue-700 font-medium">Self-Custody</p>
                <p className="text-blue-600 text-sm">Keep control via DevvE CTS vs platform custody</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Four Key Messaging Pillars
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built on DevvE's patented Contingent Transaction Sets (CTS) and DevvProtect
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <Shield className="mx-auto h-12 w-12 text-blue-600" />
                <CardTitle>Mathematical Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every transaction governed by DevvE's Contingent Transaction Sets — atomic, 
                  conditional logic that guarantees fair exchange without intermediaries.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="mx-auto h-12 w-12 text-green-600" />
                <CardTitle>Instant, Fair Settlements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Once delivery is confirmed, payment releases atomically and instantly — 
                  not in days or weeks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="mx-auto h-12 w-12 text-purple-600" />
                <CardTitle>NFT Ownership & Provenance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every service contract is minted as an NFT, representing provable ownership 
                  and completion — turning services into transferable digital assets.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="mx-auto h-12 w-12 text-orange-600" />
                <CardTitle>Independence from Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  DevScrow is infrastructure, not a marketplace. Use it standalone, integrate it 
                  into your dApp, or build on top — without relying on centralized escrow.
                </p>
              </CardContent>
            </Card>
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-16 text-center text-white">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Get paid instantly.
            </h2>
            <p className="mt-4 text-lg opacity-90">
              No waiting, no middlemen, no disputes. Just fair, atomic trade powered by DevvE.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/marketplace">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Shield className="mr-2 h-5 w-5" />
                  Explore Marketplace
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600 sm:w-auto">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
