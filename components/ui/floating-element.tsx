"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FloatingElement({ children, className, delay = 0, duration = 6 }: FloatingElementProps) {
  return (
    <div
      className={cn("animate-float", className)}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  )
}
