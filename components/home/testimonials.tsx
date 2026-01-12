"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Business Traveler",
    image: "/professional-woman-portrait.png",
    rating: 5,
    text: "Travastays transformed my business travel experience. The penthouse in Manhattan exceeded all expectations - stunning views, perfect location, and impeccable service. I've found my go-to for every trip.",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "James Chen",
    role: "Digital Nomad",
    image: "/young-professional-man-portrait.png",
    rating: 5,
    text: "As someone who works remotely, finding the perfect balance of comfort and productivity is crucial. Travastays properties consistently deliver both. The attention to detail is remarkable.",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Vacation Traveler",
    image: "/smiling-woman-portrait.png",
    rating: 5,
    text: "Our family vacation in Miami was unforgettable thanks to Travastays. The beachfront property was luxurious, kid-friendly, and the 24/7 concierge made everything seamless.",
    location: "Miami, FL",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>()

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 overflow-hidden">
          <p
            className={cn(
              "text-accent font-semibold mb-3 uppercase tracking-widest text-sm transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            Testimonials
          </p>
          <h2
            className={cn(
              "font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-4 transition-all duration-700",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
            )}
            style={{ transitionDelay: "100ms" }}
          >
            What Our Guests Say
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={cn(
            "relative max-w-4xl mx-auto transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16",
          )}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Main testimonial card */}
          <div className="relative bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-accent/10" />

            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "transition-all duration-500",
                    index === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 absolute inset-0 translate-x-8",
                  )}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-accent text-accent"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-accent">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-accent w-8" : "bg-border hover:bg-muted-foreground",
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
