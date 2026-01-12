import Image from "next/image"

export function OurStory() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Travastays was born from a simple observation: modern travelers deserve more than generic hotel rooms or
                unpredictable short-term rentals. They deserve spaces that feel like home while delivering the polish of
                luxury hospitality.
              </p>
              <p>
                Founded in 2020, we set out to curate a collection of premium urban properties that meet the highest
                standards of comfort, design, and location. Every property in our portfolio is hand-selected and
                rigorously vetted to ensure an exceptional experience.
              </p>
              <p>
                Today, we're proud to offer discerning travelers access to some of the most coveted addresses in major
                cities across the country, backed by our commitment to unparalleled service and attention to detail.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Travastays interior"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            To provide premium, reliable urban short-term stays that combine the comfort of home with the excellence of
            boutique hospitality—creating memorable experiences for every guest.
          </p>
        </div>
      </div>
    </section>
  )
}
