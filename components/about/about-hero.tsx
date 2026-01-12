import Image from "next/image"

export function AboutHero() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/placeholder.svg?height=800&width=1920" alt="City skyline" fill className="object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-primary-foreground mb-6">
          About Travastays
        </h1>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Redefining urban hospitality with curated premium stays in the world's most vibrant cities.
        </p>
      </div>
    </section>
  )
}
