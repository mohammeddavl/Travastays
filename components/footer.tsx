"use client"

import Link from "next/link"
import { Instagram, Twitter, Facebook, Mail, ArrowUpRight, Heart } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const footerLinks = {
  navigate: [
    { href: "/", label: "Home" },
    { href: "/stays", label: "Stays" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  support: [
    { href: "#", label: "FAQ" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cancellation Policy" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Mail, href: "#", label: "Email" },
]

export function Footer() {
  const { ref: footerRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })

  return (
    <footer ref={footerRef} className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div
            className={cn(
              "lg:col-span-1 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <Link href="/" className="inline-block group">
              <h3 className="font-serif text-3xl font-semibold mb-4">
                <span className="group-hover:text-accent transition-colors duration-300">Trava</span>
                <span className="text-accent">stays</span>
              </h3>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Curated premium homes in the heart of the city for modern travelers seeking comfort and style.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={cn(
                    "w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-110",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: `${200 + i * 50}ms` }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-px bg-accent" />
              Navigate
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigate.map((link, i) => (
                <li
                  key={link.href}
                  className={cn(
                    "transition-all duration-500",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                  )}
                  style={{ transitionDelay: `${200 + i * 50}ms` }}
                >
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-all duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-px bg-accent" />
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, i) => (
                <li
                  key={link.label}
                  className={cn(
                    "transition-all duration-500",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                  )}
                  style={{ transitionDelay: `${300 + i * 50}ms` }}
                >
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-all duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
            style={{ transitionDelay: "300ms" }}
          >
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-px bg-accent" />
              Connect
            </h4>

            {/* Newsletter signup */}
            <div className="mb-6">
              <p className="text-primary-foreground/60 text-sm mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
                />
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
                  Join
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-primary-foreground/60">
              <p className="hover:text-accent transition-colors cursor-pointer">hello@travastays.com</p>
              <p className="hover:text-accent transition-colors cursor-pointer">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            "border-t border-primary-foreground/10 mt-16 pt-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/40 text-sm flex items-center gap-1">
              © {new Date().getFullYear()} Travastays. Made with
              <Heart className="h-4 w-4 text-accent fill-accent animate-pulse" />
              for travelers.
            </p>

            <div className="flex items-center gap-6 text-sm text-primary-foreground/40">
              <span className="hover:text-accent transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
