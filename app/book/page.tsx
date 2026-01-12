"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Users, MapPin, Check, CreditCard, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { properties } from "@/lib/data"
import { cn } from "@/lib/utils"

function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const propertyId = searchParams.get("property")
  const checkInParam = searchParams.get("checkIn")
  const checkOutParam = searchParams.get("checkOut")
  const guestsParam = searchParams.get("guests")

  const property = properties.find((p) => p.id === propertyId) || properties[0]

  const [checkIn, setCheckIn] = useState(checkInParam || "")
  const [checkOut, setCheckOut] = useState(checkOutParam || "")
  const [guests, setGuests] = useState(Number(guestsParam) || 2)
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Payment form
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [cardName, setCardName] = useState("")

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }

  const nights = calculateNights()
  const subtotal = property.price * nights
  const serviceFee = Math.round(subtotal * 0.12)
  const taxes = Math.round(subtotal * 0.08)
  const total = subtotal + serviceFee + taxes

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Your reservation at {property.title} has been confirmed. Check your email for details.
          </p>
          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
            <h3 className="font-medium text-foreground mb-4">Booking Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmation #</span>
                <span className="font-mono text-foreground">TS{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-in</span>
                <span className="text-foreground">{checkIn || "TBD"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-out</span>
                <span className="text-foreground">{checkOut || "TBD"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Guests</span>
                <span className="text-foreground">{guests}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border font-medium">
                <span className="text-foreground">Total Paid</span>
                <span className="text-accent">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <Link href="/stays">Browse More Stays</Link>
            </Button>
            <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href={`/stays/${property.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to property
        </Link>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {["Details", "Payment", "Confirm"].map((label, i) => (
            <div key={label} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step > i + 1
                      ? "bg-green-500 text-white"
                      : step === i + 1
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium hidden sm:block",
                    step >= i + 1 ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div className={cn("w-12 sm:w-20 h-0.5 transition-all", step > i + 1 ? "bg-green-500" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-3">
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                    Confirm your trip details
                  </h1>
                  <p className="text-muted-foreground">Review and update your booking information</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Check-in</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="pl-11 h-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Check-out</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          min={checkIn}
                          className="pl-11 h-12"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Guests</label>
                    <div className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="flex-1 text-foreground">
                        {guests} Guest{guests > 1 ? "s" : ""}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                        >
                          -
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => setGuests(Math.min(10, guests + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full h-14 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                    Payment details
                  </h1>
                  <p className="text-muted-foreground">Enter your card information securely</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Card number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="pl-11 h-12 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Expiry date</label>
                      <Input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="h-12 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">CVC</label>
                      <Input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        className="h-12 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Cardholder name</label>
                    <Input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
                  <Lock className="h-5 w-5 flex-shrink-0" />
                  <p>Your payment information is encrypted and secure. We never store your full card details.</p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-14">
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!cardNumber || !expiry || !cvc || !cardName}
                    className="flex-1 h-14 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium"
                  >
                    Review Booking
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                    Review and confirm
                  </h1>
                  <p className="text-muted-foreground">Please review your booking details before confirming</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-foreground">Booking Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in</span>
                      <span className="text-foreground">{checkIn || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out</span>
                      <span className="text-foreground">{checkOut || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests</span>
                      <span className="text-foreground">{guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment method</span>
                      <span className="text-foreground font-mono">•••• {cardNumber.slice(-4)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Free cancellation</p>
                    <p className="text-muted-foreground">Cancel up to 48 hours before check-in for a full refund.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-14">
                    Back
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 h-14 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="h-5 w-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      `Pay $${total.toLocaleString()}`
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Order summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
              <div className="flex gap-4 pb-6 border-b border-border">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground line-clamp-2">{property.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm text-accent">★ {property.rating}</span>
                  </div>
                </div>
              </div>

              <div className="py-6 border-b border-border space-y-3 text-sm">
                <div className="flex justify-between text-foreground">
                  <span>
                    ${property.price} × {nights} night{nights > 1 ? "s" : ""}
                  </span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Taxes</span>
                  <span>${taxes}</span>
                </div>
              </div>

              <div className="pt-6 flex justify-between font-semibold text-lg text-foreground">
                <span>Total</span>
                <span className="text-accent">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  )
}
