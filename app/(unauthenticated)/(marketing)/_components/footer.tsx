import { Github, Shield, ExternalLink } from "lucide-react"
import Link from "next/link"

const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Footer() {
  const footerNavigation = {
    marketplace: [
      { name: "Browse Services", href: "/marketplace" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Create Listing", href: "/dashboard/listings/new" },
      { name: "Dashboard", href: "/dashboard" }
    ],
    technology: [
      { name: "Devve Network", href: "https://devvdigital.gitbook.io/devve-network", external: true },
      { name: "Atomic Escrow", href: "/#features" },
      { name: "CTS Technology", href: "https://devvdigital.gitbook.io/devve-network", external: true },
      { name: "Security", href: "/#features" }
    ],
    support: [
      { name: "Help Center", href: "/contact" },
      { name: "Contact Us", href: "/contact" },
      { name: "About", href: "/about" },
      { name: "GitHub", href: "https://github.com", external: true }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "License", href: "#" }
    ]
  }

  const socialLinks = [
    { name: "Devve Network", href: "https://devvdigital.gitbook.io/devve-network", icon: ExternalLink },
    { name: "GitHub", href: "https://github.com", icon: Github }
  ]

  return (
    <footer className="bg-muted/50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Shield className="h-6 w-6 text-blue-600" />
              DevScrow
            </Link>
            <p className="text-muted-foreground text-sm leading-6">
              The world's first marketplace with instant, mathematically guaranteed escrow. 
              Powered by Devve's revolutionary Contingent Transaction Sets.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-foreground text-sm leading-6 font-semibold">
                  Marketplace
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.marketplace.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground text-sm leading-6"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-foreground text-sm leading-6 font-semibold">
                  Technology
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.technology.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground text-sm leading-6 flex items-center gap-1"
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.name}
                        {item.external && <ExternalLink className="h-3 w-3" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-foreground text-sm leading-6 font-semibold">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.support.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground text-sm leading-6 flex items-center gap-1"
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.name}
                        {item.external && <ExternalLink className="h-3 w-3" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-foreground text-sm leading-6 font-semibold">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.legal.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground text-sm leading-6"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-border mt-16 border-t pt-8 sm:mt-20 lg:mt-24">
          <p className="text-muted-foreground text-xs leading-5">
            &copy; {new Date().getFullYear()} DevScrow. <Link href="https://devve.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">powered by the DevvE Blockchain</Link>.
          </p>
        </div>
      </div>
    </footer>
  )
}
