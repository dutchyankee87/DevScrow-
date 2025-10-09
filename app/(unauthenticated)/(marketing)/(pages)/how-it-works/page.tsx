import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  Shield, 
  Zap, 
  Star, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  Users,
  DollarSign,
  FileText,
  Lock,
  Unlock,
  AlertTriangle,
  TrendingUp,
  Eye,
  MessageSquare,
  Download,
  CreditCard,
  Wallet,
  Search
} from "lucide-react"

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                🛡️ Revolutionary Escrow Technology
              </Badge>
            </div>
            
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              How{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevScrow Works
              </span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              DevScrow is what happens when you take escrow out of the hands of platforms and put it into code. 
              It's instant, transparent, and powered by DevvE's Contingent Transaction Sets — meaning you don't need to trust anyone, not even us.
            </p>
            
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/marketplace">
                <Button size="lg" className="w-full sm:w-auto">
                  <Shield className="mr-2 h-5 w-5" />
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#detailed-process">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Trustless Escrow in 4 Simple Steps
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Mathematical guarantees replace human trust and manual enforcement
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { 
                step: "1", 
                title: "Connect Wallet", 
                desc: "Link your DevvE wallet address for self-custody transactions",
                icon: Wallet,
                color: "blue"
              },
              { 
                step: "2", 
                title: "Create/Find Service", 
                desc: "Mint NFT representing service or browse existing offerings",
                icon: Star,
                color: "green"
              },
              { 
                step: "3", 
                title: "Atomic Escrow", 
                desc: "CTS locks payment & NFT together - mathematical guarantee",
                icon: Lock,
                color: "purple"
              },
              { 
                step: "4", 
                title: "Instant Settlement", 
                desc: "Delivery confirmation triggers atomic payment release",
                icon: Zap,
                color: "orange"
              }
            ].map((item) => (
              <Card key={item.step} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-${item.color}-600 text-white`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-${item.color}-100 text-${item.color}-600 text-sm font-bold`}>
                    {item.step}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              DevScrow vs Traditional Escrow
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Mathematical certainty vs human trust - see the difference
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Traditional Problems */}
            <div>
              <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">
                Upwork Escrow Limitations
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Clock, title: "5-14 Day Manual Release", desc: "Traditional payment rails with business day processing" },
                  { icon: AlertTriangle, title: "Trusted Intermediary", desc: "Centralized platform holds funds - requires trust" },
                  { icon: CreditCard, title: "Platform Custody", desc: "Upwork controls funds during transaction" },
                  { icon: DollarSign, title: "Platform Risk", desc: "Dependent on Upwork as intermediary" }
                ].map((problem, idx) => (
                  <Card key={idx} className="border-red-200 bg-red-50">
                    <CardContent className="flex items-center gap-4 pt-6">
                      <problem.icon className="h-8 w-8 text-red-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800">{problem.title}</h4>
                        <p className="text-red-700 text-sm">{problem.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Our Solutions */}
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
                DevScrow Advantages
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Zap, title: "Instant Atomic Settlement", desc: "Payments release atomically upon confirmation" },
                  { icon: Shield, title: "Trustless Model", desc: "Mathematical guarantee vs trusting intermediaries" },
                  { icon: Wallet, title: "Self-Custody via CTS", desc: "Users maintain control via DevvE Contingent Transaction Sets" },
                  { icon: Star, title: "Zero Platform Risk", desc: "No dependency on platform solvency" }
                ].map((solution, idx) => (
                  <Card key={idx} className="border-green-200 bg-green-50">
                    <CardContent className="flex items-center gap-4 pt-6">
                      <solution.icon className="h-8 w-8 text-green-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-800">{solution.title}</h4>
                        <p className="text-green-700 text-sm">{solution.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Process */}
      <section id="detailed-process" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              The Complete Process Explained
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A step-by-step breakdown of how transactions work on DevScrow
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 1: Discovery & Agreement */}
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Discovery & Agreement</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    <strong>Buyers:</strong> Browse our curated marketplace of premium professional services. 
                    Each seller is verified and specializes in high-value work ($500+).
                  </p>
                  <p className="text-gray-600">
                    <strong>Sellers:</strong> Create detailed service listings with clear deliverables, 
                    timelines, and pricing. Our platform attracts serious buyers.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">What happens here:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Initial project discussion and scope definition</li>
                      <li>• Agreement on deliverables, timeline, and payment terms</li>
                      <li>• Both parties accept the escrow terms</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <Users className="mx-auto h-16 w-16 text-blue-600" />
                  <h4 className="text-lg font-semibold">Project Matching</h4>
                  <p className="text-gray-600 text-sm">
                    Smart matching between buyers and sellers based on requirements, 
                    budget, and expertise.
                  </p>
                </div>
              </Card>
            </div>

            {/* Step 2: Escrow Setup */}
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <Card className="p-6 lg:order-2">
                <div className="text-center space-y-4">
                  <Lock className="mx-auto h-16 w-16 text-green-600" />
                  <h4 className="text-lg font-semibold">Contingent Transaction Set</h4>
                  <p className="text-gray-600 text-sm">
                    Funds secured through Devve's revolutionary CTS technology - 
                    mathematically guaranteed outcomes.
                  </p>
                </div>
              </Card>
              <div className="lg:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Secure Escrow Setup</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Once both parties agree, the buyer's funds are locked in a Contingent Transaction Set (CTS). 
                    This is not a traditional escrow where a third party holds your money.
                  </p>
                  <p className="text-gray-600">
                    Instead, the CTS creates a cryptographic lock that can only be unlocked when 
                    specific conditions are met - either successful delivery or dispute resolution.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">CTS Benefits:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Funds remain in buyer's control (self-custody)</li>
                      <li>• Mathematically impossible for either party to cheat</li>
                      <li>• No centralized entity can freeze or steal funds</li>
                      <li>• Instant settlement when conditions are met</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Work & Milestones */}
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Work Execution & Tracking</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    The seller begins work with full confidence that payment is guaranteed upon delivery. 
                    Our platform provides milestone tracking and communication tools.
                  </p>
                  <p className="text-gray-600">
                    For larger projects, milestones can be set up with partial payments released 
                    as each phase is completed and approved.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Built-in Protection:</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Milestone-based progress tracking</li>
                      <li>• Integrated communication system</li>
                      <li>• Automated deadline monitoring</li>
                      <li>• Dispute prevention through clear expectations</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-2">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <MessageSquare className="h-8 w-8 text-purple-600" />
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold">Project Dashboard</h4>
                  <p className="text-gray-600 text-sm">
                    Real-time project tracking with milestone management, 
                    file sharing, and progress updates.
                  </p>
                </div>
              </Card>
            </div>

            {/* Step 4: Delivery & Payment */}
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <Card className="p-6 lg:order-2">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-2">
                    <Unlock className="h-8 w-8 text-orange-600" />
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                  <h4 className="text-lg font-semibold">Instant Settlement</h4>
                  <p className="text-gray-600 text-sm">
                    Payment released immediately upon buyer confirmation - 
                    no waiting periods or manual processing.
                  </p>
                </div>
              </Card>
              <div className="lg:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-white text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Delivery & Instant Payment</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    When the seller completes the work, they submit deliverables through our platform. 
                    The buyer reviews and either approves or requests revisions.
                  </p>
                  <p className="text-gray-600">
                    Upon buyer approval, the CTS automatically executes and payment is instantly 
                    transferred to the seller. No delays, no manual processing, no holds.
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">What happens:</h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Seller uploads final deliverables</li>
                      <li>• Buyer reviews and confirms satisfaction</li>
                      <li>• CTS executes automatically</li>
                      <li>• Payment transferred instantly to seller</li>
                      <li>• Project marked as complete</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dispute Resolution */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What If Something Goes Wrong?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built-in dispute resolution with mathematical fairness
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Eye className="mx-auto h-12 w-12 text-blue-600" />
                <CardTitle className="text-center">Transparent Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  All project communications, deliverables, and agreements are 
                  cryptographically recorded and cannot be altered.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mx-auto h-12 w-12 text-green-600" />
                <CardTitle className="text-center">Objective Arbitration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Disputes are resolved based on the original agreement and 
                  deliverable evidence, not subjective opinions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mx-auto h-12 w-12 text-purple-600" />
                <CardTitle className="text-center">Fair Resolution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  The CTS can execute partial payments, refunds, or split 
                  decisions based on the evidence and original terms.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 text-center">
              Dispute Resolution Process
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl mb-2">⚠️</div>
                <p className="text-yellow-700 font-medium">Issue Raised</p>
                <p className="text-yellow-600 text-sm">Either party can flag a problem</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📋</div>
                <p className="text-yellow-700 font-medium">Evidence Review</p>
                <p className="text-yellow-600 text-sm">All project data is analyzed objectively</p>
              </div>
              <div>
                <div className="text-2xl mb-2">⚖️</div>
                <p className="text-yellow-700 font-medium">Fair Decision</p>
                <p className="text-yellow-600 text-sm">Resolution based on original agreement</p>
              </div>
              <div>
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-yellow-700 font-medium">Instant Execution</p>
                <p className="text-yellow-600 text-sm">CTS executes the resolution immediately</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              The Technology Behind DevScrow
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powered by Devve's revolutionary Contingent Transaction Sets
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="p-8">
              <div className="text-center mb-6">
                <Shield className="mx-auto h-16 w-16 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold">Contingent Transaction Sets (CTS)</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  CTS is a revolutionary blockchain technology that allows for conditional 
                  transactions without requiring trust in a centralized party.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Features:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Self-executing contracts with mathematical guarantees</li>
                    <li>• No single point of failure or control</li>
                    <li>• Instant settlement when conditions are met</li>
                    <li>• Cryptographic proof of all transactions</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="text-center mb-6">
                <Zap className="mx-auto h-16 w-16 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold">Devve Blockchain Network</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Built on the Devve blockchain, specifically designed for complex 
                  financial transactions and smart contract execution.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Network Benefits:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• High throughput and low latency</li>
                    <li>• Enterprise-grade security</li>
                    <li>• Low transaction costs</li>
                    <li>• Environmental sustainability</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link href="https://devve.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Learn More About Devve Technology
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
                  Browse Marketplace
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600 sm:w-auto">
                  Start Selling Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}