// Complete usage example showing all three components together

import { Header, ShareWidget, Footer } from '../src'
import { devscrowHeaderConfig, devscrowShareConfig, devscrowFooterConfig } from './devscrow-config'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header config={devscrowHeaderConfig} />
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer config={devscrowFooterConfig} />
      
      {/* Share Widget (sticky) */}
      <ShareWidget config={devscrowShareConfig} />
    </div>
  )
}

// Alternative: Custom configuration example
import { Star, Heart, Zap } from 'lucide-react'

const customHeaderConfig = {
  brand: {
    name: "MyApp",
    href: "/",
    icon: Star
  },
  navigation: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" }
  ],
  auth: {
    loginHref: "/sign-in",
    signupHref: "/sign-up",
    dashboardHref: "/app"
  },
  showThemeToggle: true
}

const customShareConfig = {
  title: "Love MyApp?",
  subtitle: "Share with friends",
  shareText: "Check out MyApp - it's amazing!",
  description: "The best app ever created",
  buttonText: "Share Now",
  shareUrl: "https://myapp.com"
}

const customFooterConfig = {
  brand: {
    name: "MyApp",
    href: "/",
    description: "Making the world a better place, one user at a time.",
    icon: Heart
  },
  sections: [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Roadmap", href: "/roadmap" }
      ]
    }
  ],
  socialLinks: [
    { name: "GitHub", href: "https://github.com/myorg", icon: Zap }
  ]
}

export function CustomLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header config={customHeaderConfig} />
      <main className="flex-1">{children}</main>
      <Footer config={customFooterConfig} />
      <ShareWidget config={customShareConfig} />
    </div>
  )
}