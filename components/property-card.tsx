"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Wifi, Wind, UtensilsCrossed, Car, Heart, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  id: string
  name: string
  location: string
  price: number
  image: string
  amenities: string[]
  rating?: number
  reviews?: number
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  ac: <Wind className="h-4 w-4" />,
  kitchen: <UtensilsCrossed className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />,
}

export function PropertyCard({
  id,
  name,
  location,
  price,
  image,
  amenities,
  rating = 4.8,
  reviews = 24,
}: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -8
    const rotateY = (x - 0.5) * 8
    setTransform({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="group bg-card rounded-2xl overflow-hidden border border-border transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10"
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/50 to-secondary animate-shimmer" />
        )}
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110",
            "group-hover:scale-110",
          )}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className={cn(
            "absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm",
            isLiked
              ? "bg-white text-red-500 scale-110"
              : "bg-black/30 text-white hover:bg-white hover:text-red-500 hover:scale-110",
          )}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("h-5 w-5 transition-all duration-300", isLiked && "fill-current animate-scale-bounce")}
          />
        </button>

        {/* Featured badge with shimmer */}
        <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold overflow-hidden">
          <span className="relative z-10">Featured</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
          <span className="font-bold text-lg">${price}</span>
          <span className="text-white/70 text-sm group-hover:text-accent-foreground/70"> / night</span>
        </div>

        <div className="absolute bottom-3 right-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link
            href={`/stays/${id}`}
            className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors"
          >
            Quick View
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="p-5 relative" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-lg font-semibold text-card-foreground group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-sm bg-accent/10 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground">({reviews})</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          {location}
        </p>

        <div className="flex items-center gap-2 mb-4">
          {amenities.slice(0, 4).map((amenity, i) => (
            <span
              key={amenity}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 cursor-pointer"
              title={amenity}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {amenityIcons[amenity.toLowerCase()]}
            </span>
          ))}
          {amenities.length > 4 && (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg">
              +{amenities.length - 4}
            </span>
          )}
        </div>

        <Button
          asChild
          className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 group/btn relative overflow-hidden"
        >
          <Link href={`/stays/${id}`}>
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-accent -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
