"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stays", label: "Stays" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 group transition-all duration-700",
              mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
            )}
          >
            <span className="font-serif text-2xl font-semibold tracking-tight relative">
              <span className="group-hover:text-accent transition-colors duration-300">Trava</span>
              <span className="text-accent">stays</span>
              {/* Underline animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                  pathname === link.href ? "text-accent" : "text-foreground/80 hover:text-foreground",
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
                )}
                style={{ transitionDelay: `${100 + index * 50}ms` }}
              >
                {link.label}

                {/* Hover background */}
                <span
                  className={cn(
                    "absolute inset-0 rounded-lg transition-all duration-300 -z-10",
                    pathname === link.href ? "bg-accent/10" : "bg-transparent group-hover:bg-secondary",
                  )}
                />

                {/* Active indicator */}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div
            className={cn(
              "hidden md:flex items-center gap-3 transition-all duration-700",
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-accent/10 hover:text-accent transition-all duration-300"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <MagneticButton
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden group"
              magneticStrength={0.15}
              asChild
            >
              <Link href="/book">
                <span className="relative z-10">Book Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              "md:hidden p-2 hover:bg-secondary rounded-lg transition-all duration-300",
              isOpen && "bg-secondary",
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={cn(
                  "h-6 w-6 absolute inset-0 transition-all duration-300",
                  isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100",
                )}
              />
              <X
                className={cn(
                  "h-6 w-6 absolute inset-0 transition-all duration-300",
                  isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 bg-background/98 backdrop-blur-xl border-b border-border",
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block text-sm font-medium py-3 px-4 rounded-xl transition-all duration-300",
                pathname === link.href ? "bg-accent/10 text-accent" : "hover:bg-secondary",
                isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
              )}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: isOpen ? `${index * 75}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className={cn(
              "pt-4 flex flex-col gap-3 transition-all duration-300",
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
            style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
          >
            <Button variant="ghost" size="sm" className="w-full justify-center" asChild>
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/book" onClick={() => setIsOpen(false)}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
