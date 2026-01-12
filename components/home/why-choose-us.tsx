"use client"

import { useState } from "react"
import { Home, MapPin, ShieldCheck, Headphones, ArrowRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Home,
    title: "Premium Comfort",
    description:
      "Every property is curated for exceptional quality and comfort, featuring premium amenities and thoughtful design.",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description:
      "Strategically located in the heart of major cities, offering easy access to attractions and business districts.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Verified Homes",
    description:
      "All properties undergo rigorous verification to ensure safety, cleanliness, and accuracy of listings.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated concierge team is available around the clock to assist with any requests or concerns.",
    color: "from-purple-500/20 to-pink-500/20",
  },
]

export function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>()

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary overflow-hidden relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 overflow-hidden">
          <p
            className={cn(
              "text-accent font-semibold mb-3 uppercase tracking-widest text-sm transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            Why Us
          </p>
          <h2
            className={cn(
              "font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-4 transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
            )}
            style={{ transitionDelay: "100ms" }}
          >
            Why Choose Travastays
          </h2>
          <p
            className={cn(
              "text-muted-foreground max-w-2xl mx-auto text-lg transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{ transitionDelay: "200ms" }}
          >
            We're committed to providing the finest urban accommodations with unmatched service and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "relative text-center p-8 rounded-2xl bg-card border border-border transition-all duration-500 cursor-pointer group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16",
                hoveredIndex === index && "shadow-2xl shadow-accent/10 border-accent/30 -translate-y-3",
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500",
                  feature.color,
                  hoveredIndex === index && "opacity-100",
                )}
              />

              <div
                className={cn(
                  "relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-500",
                  hoveredIndex === index
                    ? "bg-accent text-accent-foreground scale-110 rotate-3"
                    : "bg-accent/10 text-accent",
                )}
              >
                <feature.icon className="h-8 w-8" />
                {/* Glow effect */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 rounded-2xl bg-accent/50 blur-xl -z-10 animate-pulse" />
                )}
              </div>

              <h3 className="relative font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="relative text-muted-foreground text-sm leading-relaxed">{feature.description}</p>

              <div
                className={cn(
                  "relative mt-4 flex items-center justify-center gap-1 text-accent font-medium text-sm transition-all duration-300",
                  hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                )}
              >
                Learn more
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>

              <div
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-accent rounded-t-full transition-all duration-500",
                  hoveredIndex === index ? "w-20" : "w-0",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
