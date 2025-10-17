// Example configuration matching the original DevScrow implementation

import { HeaderConfig, ShareWidgetConfig, FooterConfig } from '../src'
import { Github, Shield, ExternalLink } from 'lucide-react'

export const devscrowHeaderConfig: HeaderConfig = {
  brand: {
    name: "DevScrow",
    href: "/",
    icon: Shield
  },
  navigation: [
    { name: "Marketplace", href: "/marketplace" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ],
  auth: {
    loginHref: "/login",
    signupHref: "/signup", 
    dashboardHref: "/dashboard"
  },
  showThemeToggle: true
}

export const devscrowShareConfig: ShareWidgetConfig = {
  title: "Share DevScrow with friends!",
  subtitle: "Send on WhatsApp",
  shareText: "Check out DevScrow - the secure escrow platform for digital transactions!",
  description: "Secure digital escrow platform",
  buttonText: "Share Now",
  shareUrl: "https://devscrow.com"
}

export const devscrowFooterConfig: FooterConfig = {
  brand: {
    name: "DevScrow",
    href: "/",
    description: "Escrow without trust — powered by mathematics. The world's first trustless escrow platform for digital work.",
    icon: Shield
  },
  sections: [
    {
      title: "Marketplace",
      links: [
        { name: "Browse Services", href: "/marketplace" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "Create Listing", href: "/dashboard/listings/new" },
        { name: "Dashboard", href: "/dashboard" }
      ]
    },
    {
      title: "Technology", 
      links: [
        { name: "Devve Network", href: "https://devvdigital.gitbook.io/devve-network", external: true },
        { name: "Atomic Escrow", href: "/#features" },
        { name: "CTS Technology", href: "https://devvdigital.gitbook.io/devve-network", external: true },
        { name: "Security", href: "/#features" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/contact" },
        { name: "Contact Us", href: "/contact" },
        { name: "About", href: "/about" },
        { name: "GitHub", href: "https://github.com", external: true }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "License", href: "#" }
      ]
    }
  ],
  socialLinks: [
    { name: "Devve Network", href: "https://devvdigital.gitbook.io/devve-network", icon: ExternalLink },
    { name: "GitHub", href: "https://github.com", icon: Github }
  ],
  copyright: `© ${new Date().getFullYear()} DevScrow. Built on DevvE's patented Contingent Transaction Sets (CTS) and DevvProtect.`
}