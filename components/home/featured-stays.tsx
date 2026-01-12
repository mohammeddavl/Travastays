"use client"

import Link from "next/link"
import { PropertyCard } from "@/components/property-card"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ArrowRight, Sparkles } from "lucide-react"
import { properties } from "@/lib/data"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

export default function FeaturedStays() {
  const featured = properties.slice(0, 3)
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="overflow-hidden">
            <div
              className={cn(
                "flex items-center gap-2 mb-3 transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
            >
              <Sparkles className="w-5 h-5 text-accent" />
              <p className="text-accent font-semibold uppercase tracking-widest text-sm">Handpicked for you</p>
            </div>
            <h2
              className={cn(
                "font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-3 transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              )}
              style={{ transitionDelay: "100ms" }}
            >
              Featured Stays
            </h2>
            <p
              className={cn(
                "text-muted-foreground text-lg transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: "200ms" }}
            >
              Hand-picked properties for an exceptional experience
            </p>
          </div>

          <MagneticButton
            asChild
            variant="ghost"
            className={cn(
              "self-start sm:self-auto hover:bg-accent/10 hover:text-accent group transition-all duration-700",
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
            )}
            style={{ transitionDelay: "300ms" }}
          >
            <Link href="/stays" className="flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property, index) => (
            <div
              key={property.id}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16",
              )}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center">
          <div
            className={cn(
              "h-px bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-1000",
              isVisible ? "w-1/2 opacity-100" : "w-0 opacity-0",
            )}
            style={{ transitionDelay: "800ms" }}
          />
        </div>
      </div>
    </section>
  )
}
