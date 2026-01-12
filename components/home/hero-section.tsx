"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Calendar, Users, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { useParallax } from "@/hooks/use-parallax"
import { cn } from "@/lib/utils"

const popularLocations = ["New York", "Los Angeles", "Miami", "San Francisco", "Chicago"]

export function HeroSection() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)
  const [isSearching, setIsSearching] = useState(false)
  const [showLocations, setShowLocations] = useState(false)
  const [mounted, setMounted] = useState(false)
  const parallaxOffset = useParallax(0.3)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = async () => {
    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    router.push(`/stays${location ? `?location=${encodeURIComponent(location)}` : ""}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100"
        style={{
          backgroundImage: "url('/luxury-urban-skyline-at-dusk.jpg')",
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      <FloatingElement className="absolute top-32 left-[10%] opacity-20 pointer-events-none hidden lg:block" delay={0}>
        <div className="w-24 h-24 rounded-full border border-accent/50" />
      </FloatingElement>
      <FloatingElement
        className="absolute top-48 right-[15%] opacity-20 pointer-events-none hidden lg:block"
        delay={2}
        duration={8}
      >
        <div className="w-16 h-16 rounded-full bg-accent/20" />
      </FloatingElement>
      <FloatingElement
        className="absolute bottom-40 left-[20%] opacity-20 pointer-events-none hidden lg:block"
        delay={1}
        duration={7}
      >
        <Sparkles className="w-8 h-8 text-accent" />
      </FloatingElement>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-8 transition-all duration-1000",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm text-primary-foreground/90 font-medium">Premium Urban Living</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6 text-balance overflow-hidden">
          {["Luxury", "Stays", "for", "Modern", "Travelers"].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
              <span
                className={cn(
                  "inline-block transition-all duration-700",
                  mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                )}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          className={cn(
            "text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-4 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ transitionDelay: "600ms" }}
        >
          Curated premium homes in the heart of the city
        </p>

        <div
          className={cn(
            "flex items-center justify-center gap-8 mb-12 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ transitionDelay: "800ms" }}
        >
          {[
            { value: "500+", label: "Properties" },
            { value: "50+", label: "Cities" },
            { value: "10K+", label: "Happy Guests" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-serif font-semibold text-accent">{stat.value}</p>
              <p className="text-xs sm:text-sm text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "max-w-4xl mx-auto bg-card rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-1000 relative",
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95",
          )}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-accent/50 via-transparent to-accent/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location with suggestions */}
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 group-focus-within:text-accent transition-colors" />
              <Input
                type="text"
                placeholder="Where to?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setShowLocations(true)}
                onBlur={() => setTimeout(() => setShowLocations(false), 200)}
                className="pl-10 h-14 bg-secondary border-0 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent transition-all duration-300 hover:bg-secondary/80"
              />
              {showLocations && !location && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden">
                  <p className="px-4 py-2 text-xs text-muted-foreground uppercase tracking-wider">
                    Popular Destinations
                  </p>
                  {popularLocations.map((loc, i) => (
                    <button
                      key={loc}
                      className={cn(
                        "w-full text-left px-4 py-3 hover:bg-accent/10 transition-all flex items-center gap-2",
                        "opacity-0 animate-slide-up",
                      )}
                      style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
                      onMouseDown={() => setLocation(loc)}
                    >
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="text-sm">{loc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Check-in date */}
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 group-focus-within:text-accent transition-colors" />
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="pl-10 h-14 bg-secondary border-0 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent transition-all duration-300 hover:bg-secondary/80"
              />
            </div>

            {/* Check-out date */}
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 group-focus-within:text-accent transition-colors" />
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn}
                className="pl-10 h-14 bg-secondary border-0 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent transition-all duration-300 hover:bg-secondary/80"
              />
            </div>

            {/* Guests selector */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative flex items-center w-full h-14 px-10 bg-secondary rounded-md text-left text-card-foreground hover:bg-secondary/80 transition-all duration-300 group">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span>
                    {guests} Guest{guests > 1 ? "s" : ""}
                  </span>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-transform group-hover:rotate-180" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4" align="start">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Guests</p>
                    <p className="text-sm text-muted-foreground">How many?</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent hover:bg-accent hover:text-accent-foreground transition-all"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium text-lg">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent hover:bg-accent hover:text-accent-foreground transition-all"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      disabled={guests >= 10}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <MagneticButton
            onClick={handleSearch}
            disabled={isSearching}
            magneticStrength={0.2}
            className={cn(
              "w-full mt-4 h-14 bg-accent text-accent-foreground font-medium text-base relative overflow-hidden group",
              !isSearching && "hover:shadow-lg hover:shadow-accent/25",
            )}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            {isSearching ? (
              <span className="flex items-center gap-2 relative z-10">
                <span className="h-5 w-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2 relative z-10">
                <Search className="h-5 w-5" />
                Search Stays
              </span>
            )}
          </MagneticButton>
        </div>

        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
            <span className="text-xs uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
