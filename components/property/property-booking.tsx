"use client"

import { useState, useEffect } from "react"
import { Calendar, Users, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PropertyBookingProps {
  price: number
}

export function PropertyBooking({ price }: PropertyBookingProps) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)
  const [isBooking, setIsBooking] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  const nights = calculateNights()
  const subtotal = price * (nights || 1)
  const serviceFee = Math.round(subtotal * 0.12)
  const total = subtotal + serviceFee

  const handleBook = async () => {
    setIsBooking(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsBooking(false)
    setShowSuccess(true)
  }

  // Reset success message after 3 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  return (
    <div className="sticky top-24 bg-card border border-border rounded-xl p-6 shadow-lg">
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-serif text-3xl font-semibold text-card-foreground">${price}</span>
        <span className="text-muted-foreground">/ night</span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="pl-9 h-12 focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn}
                className="pl-9 h-12 focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-card-foreground mb-2 block">Guests</label>
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1">
              {guests} Guest{guests > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                disabled={guests <= 1}
              >
                -
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setGuests(Math.min(10, guests + 1))}
                disabled={guests >= 10}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleBook}
        disabled={isBooking || !checkIn || !checkOut || nights <= 0}
        className={cn(
          "w-full h-14 font-medium text-base transition-all duration-300",
          showSuccess
            ? "bg-green-600 hover:bg-green-600"
            : "bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]",
        )}
      >
        {isBooking ? (
          <span className="flex items-center gap-2">
            <span className="h-5 w-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
            Processing...
          </span>
        ) : showSuccess ? (
          <span className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            Booking Confirmed!
          </span>
        ) : (
          "Book Now"
        )}
      </Button>

      {/* Availability note */}
      {(!checkIn || !checkOut) && (
        <p className="text-center text-sm text-muted-foreground mt-3 flex items-center justify-center gap-1">
          <Info className="h-4 w-4" />
          Select dates to see pricing
        </p>
      )}

      {nights > 0 && (
        <div className="space-y-3 text-sm mt-6 pt-6 border-t border-border animate-fade-in">
          <div className="flex justify-between text-card-foreground">
            <span>
              ${price} × {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-card-foreground">
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-card-foreground pt-3 border-t border-border">
            <span>Total</span>
            <span className="text-accent">${total}</span>
          </div>
        </div>
      )}

      {/* Trust badges */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3 text-green-600" />
            Free cancellation
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3 text-green-600" />
            Secure payment
          </span>
        </div>
      </div>
    </div>
  )
}
