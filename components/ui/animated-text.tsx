"use client"

import type React from "react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  animation?: "reveal" | "slide" | "blur" | "split"
  delay?: number
}

export function AnimatedText({
  text,
  className,
  as: Component = "p",
  animation = "reveal",
  delay = 0,
}: AnimatedTextProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>()

  if (animation === "split") {
    const words = text.split(" ")
    return (
      <Component ref={ref as React.RefObject<HTMLHeadingElement>} className={cn("overflow-hidden", className)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <span
              className={cn(
                "inline-block transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
              )}
              style={{ transitionDelay: `${delay + i * 50}ms` }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    )
  }

  const animationClasses = {
    reveal: isVisible ? "animate-text-reveal" : "opacity-0",
    slide: isVisible ? "animate-slide-up" : "opacity-0 translate-y-12",
    blur: isVisible ? "animate-blur-in" : "opacity-0 blur-lg",
  }

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn(animationClasses[animation], className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}
    </Component>
  )
}
