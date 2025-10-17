import { Github, Shield, ExternalLink } from "lucide-react"
import Link from "next/link"

export interface FooterSection {
  title: string
  links: Array<{
    name: string
    href: string
    external?: boolean
  }>
}

export interface FooterConfig {
  brand: {
    name: string
    href: string
    description: string
    icon?: React.ComponentType<{ className?: string }>
  }
  sections: FooterSection[]
  socialLinks: Array<{
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }>
  copyright?: string
}

interface FooterProps {
  config: FooterConfig
}

export function Footer({ config }: FooterProps) {
  const BrandIcon = config.brand.icon || Shield
  const currentYear = new Date().getFullYear()
  const copyrightText = config.copyright || `© ${currentYear} ${config.brand.name}. All rights reserved.`

  return (
    <footer className="bg-muted/50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href={config.brand.href} className="flex items-center gap-2 text-xl font-bold">
              <BrandIcon className="h-6 w-6 text-blue-600" />
              {config.brand.name}
            </Link>
            <p className="text-muted-foreground text-sm leading-6">
              {config.brand.description}
            </p>
            <div className="flex space-x-6">
              {config.socialLinks.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {config.sections.slice(0, 2).map((section, index) => (
                <div key={section.title} className={index > 0 ? "mt-10 md:mt-0" : ""}>
                  <h3 className="text-foreground text-sm leading-6 font-semibold">
                    {section.title}
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.links.map(item => (
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
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {config.sections.slice(2, 4).map((section, index) => (
                <div key={section.title} className={index > 0 ? "mt-10 md:mt-0" : ""}>
                  <h3 className="text-foreground text-sm leading-6 font-semibold">
                    {section.title}
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.links.map(item => (
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
              ))}
            </div>
          </div>
        </div>
        <div className="border-border mt-16 border-t pt-8 sm:mt-20 lg:mt-24">
          <p className="text-muted-foreground text-xs leading-5">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}