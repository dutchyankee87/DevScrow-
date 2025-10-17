"use client"

import { Button } from "./ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Menu, Moon, Sun, Shield, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"

export interface HeaderConfig {
  brand: {
    name: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }
  navigation: Array<{
    name: string
    href: string
  }>
  auth: {
    loginHref: string
    signupHref: string
    dashboardHref: string
  }
  showThemeToggle?: boolean
}

interface HeaderProps {
  config: HeaderConfig
  userMembership?: string | null
}

export function Header({ config, userMembership }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const BrandIcon = config.brand.icon || Shield

  return (
    <>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href={config.brand.href} className="-m-1.5 p-1.5 flex items-center gap-2">
              <BrandIcon className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">{config.brand.name}</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-muted-foreground -m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {config.navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-muted-foreground text-sm leading-6 font-semibold"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            {config.showThemeToggle !== false && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
            <SignedOut>
              <Button variant="ghost" asChild>
                <Link href={config.auth.loginHref}>Log in</Link>
              </Button>
              <Button asChild>
                <Link href={config.auth.signupHref}>Sign up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href={config.auth.dashboardHref}>Dashboard</Link>
              </Button>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mounted && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="bg-foreground/20 fixed inset-0 z-[60] backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="bg-background sm:ring-border fixed inset-y-0 right-0 z-[70] w-full overflow-y-auto px-6 py-6 shadow-2xl sm:max-w-sm sm:ring-1 lg:hidden">
            <div className="flex items-center justify-between">
              <Link
                href={config.brand.href}
                className="-m-1.5 p-1.5 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BrandIcon className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">{config.brand.name}</span>
              </Link>
              <button
                type="button"
                className="text-muted-foreground -m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="divide-border -my-6 divide-y">
                <div className="space-y-2 py-6">
                  {config.navigation.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground hover:bg-accent hover:text-accent-foreground -mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="space-y-3 py-6">
                  {config.showThemeToggle !== false && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark")
                        setMobileMenuOpen(false)
                      }}
                    >
                      {theme === "dark" ? (
                        <Sun className="mr-2 h-4 w-4" />
                      ) : (
                        <Moon className="mr-2 h-4 w-4" />
                      )}
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </Button>
                  )}
                  <SignedOut>
                    <Button variant="outline" className="w-full" asChild>
                      <Link
                        href={config.auth.loginHref}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link
                        href={config.auth.signupHref}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </Button>
                  </SignedOut>
                  <SignedIn>
                    <Button className="w-full" asChild>
                      <Link
                        href={config.auth.dashboardHref}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </Button>
                    <div className="flex justify-center pt-4">
                      <UserButton />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

