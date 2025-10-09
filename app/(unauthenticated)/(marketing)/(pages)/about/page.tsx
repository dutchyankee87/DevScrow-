import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Users, Target, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              DevScrow is to Upwork escrow what{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ethereum smart contracts were to PayPal
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We replace human trust and manual enforcement with code-based fairness and instant settlement. 
              Built on DevvE's patented Contingent Transaction Sets (CTS) and DevvProtect.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                DevScrow is a next-generation escrow protocol for digital services — replacing trust with mathematics, 
                delays with instant settlement, and centralization with self-custody.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                The result: a fair, unstoppable way to transact — where payment and delivery always happen together, 
                and nobody can cheat the system.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Mathematical trust via DevvE's CTS</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Instant, fair settlements</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Independence from platforms</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Trustless</div>
                  <div className="text-blue-100">Mathematical guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Atomic</div>
                  <div className="text-blue-100">Instant settlement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Self-Custody</div>
                  <div className="text-blue-100">Via DevvE CTS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Zero</div>
                  <div className="text-blue-100">Platform risk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Positioning Summary</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              DevScrow turns escrow into an on-chain primitive — a programmable settlement layer for digital services. 
              Using DevvE's patented CTS and DevvProtect layers, it replaces platform mediation with cryptographic certainty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-2">
              <CardHeader>
                <Shield className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>DevvProtect Escrow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Native blockchain escrow that executes atomically. Funds are locked cryptographically, 
                  not held by a centralized party.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <Zap className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Atomic Settlement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All transaction components execute simultaneously or not at all. 
                  Eliminates the possibility of partial failures or disputes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <Target className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Zero Trust Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mathematical guarantees replace the need to trust platforms, payment processors, 
                  or other intermediaries.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-xl p-8 border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How CTS Works in Practice</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-600 font-bold text-lg mx-auto mb-3">1</div>
                <p className="text-sm font-medium mb-2">Service Purchase</p>
                <p className="text-xs text-gray-600">Buyer initiates NFT checkout for service listing</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-600 font-bold text-lg mx-auto mb-3">2</div>
                <p className="text-sm font-medium mb-2">Escrow Bundle</p>
                <p className="text-xs text-gray-600">Funds locked in CTS with delivery conditions</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-600 font-bold text-lg mx-auto mb-3">3</div>
                <p className="text-sm font-medium mb-2">Work Delivery</p>
                <p className="text-xs text-gray-600">Seller completes work and submits deliverables</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-600 font-bold text-lg mx-auto mb-3">4</div>
                <p className="text-sm font-medium mb-2">Atomic Release</p>
                <p className="text-xs text-gray-600">Confirmation triggers instant payment settlement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built by Professionals, For Professionals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team has experienced firsthand the frustrations of traditional freelance platforms 
              and payment systems. We're building the solution we wish existed.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center md:text-left">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto md:mx-0 mb-4">
                      DR
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Dillon Richardson</h3>
                    <p className="text-blue-600 font-medium mb-4">Founder & CEO</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-600 mb-4">
                      Dillon has built and scaled multiple technology companies, experiencing the pain points 
                      of traditional payment systems and escrow services firsthand. His vision for DevScrow 
                      emerged from years of dealing with payment disputes, holds, and chargebacks in the 
                      professional services space.
                    </p>
                    <p className="text-gray-600">
                      Recognizing the transformative potential of Devve's CTS technology, Dillon saw an 
                      opportunity to eliminate these systemic issues entirely through mathematical guarantees 
                      rather than trust-based systems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Security First</h3>
              <p className="text-sm text-gray-600">Every transaction is protected by cryptographic guarantees</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Professional Focus</h3>
              <p className="text-sm text-gray-600">Built specifically for high-value professional services</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">Leveraging cutting-edge blockchain technology for practical solutions</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Results Driven</h3>
              <p className="text-sm text-gray-600">Focused on solving real problems with measurable outcomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-16 text-center text-white">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Get paid instantly.
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              No waiting, no middlemen, no disputes. Just fair, atomic trade powered by DevvE.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/marketplace">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Shield className="mr-2 h-5 w-5" />
                  Explore Marketplace
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600 sm:w-auto">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
