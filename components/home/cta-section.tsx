"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { cn } from "@/lib/utils"

export function CtaSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl transition-all duration-1000",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}
        />
        <div
          className={cn(
            "absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-2 h-2 bg-accent/30 rounded-full animate-float",
              isVisible ? "opacity-100" : "opacity-0",
            )}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">Start Your Journey</span>
        </div>

        <h2
          className={cn(
            "font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 text-balance transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ transitionDelay: "100ms" }}
        >
          Ready to Experience
          <span className="block mt-2 text-accent">Premium Luxury?</span>
        </h2>

        <p
          className={cn(
            "text-primary-foreground/70 max-w-2xl mx-auto mb-10 text-lg transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ transitionDelay: "200ms" }}
        >
          Browse our collection of premium properties and find your perfect city escape.
        </p>

        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ transitionDelay: "300ms" }}
        >
          <MagneticButton
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 group relative overflow-hidden px-8"
          >
            <Link href="/stays">
              <span className="relative z-10 flex items-center gap-2">
                Explore Stays
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </MagneticButton>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div
          className={cn(
            "mt-16 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/50 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ transitionDelay: "400ms" }}
        >
          {["Trusted by 10,000+ guests", "500+ verified properties", "24/7 premium support"].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
