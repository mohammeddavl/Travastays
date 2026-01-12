'use client';  // ← ADD THIS LINE AT THE TOP

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StaysGrid } from "@/components/stays/stays-grid-robust"
import { StaysFilters } from "@/components/stays/stays-filters"

export default function StaysPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-4">Our Stays</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover curated premium homes in the most desirable urban locations.
            </p>
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaysFilters />
            <StaysGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}