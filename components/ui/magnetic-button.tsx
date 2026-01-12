"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number
  asChild?: boolean
}

export function MagneticButton({
  children,
  className,
  magneticStrength = 0.3,
  asChild = false,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) * magneticStrength
    const y = (e.clientY - centerY) * magneticStrength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  if (asChild) {
    return (
      <div
        ref={ref}
        className="inline-block"
        style={{ transform: `translate(${position.x}px, ${position.y}px)`, transition: "transform 200ms" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Slot
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            props.size === "sm" && "h-8 px-3 text-xs",
            props.size === "lg" && "h-10 px-8",
            props.size === "icon" && "h-9 w-9",
            !props.size && "h-9 px-4 py-2",
            className,
          )}
        >
          {children}
        </Slot>
      </div>
    )
  }

  return (
    <Button
      className={cn("transition-transform duration-200", className)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Button>
  )
}
