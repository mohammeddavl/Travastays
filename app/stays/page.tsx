import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { properties } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Stays | Travastays",
  description: "Browse our collection of premium urban homes and find your perfect stay.",
}

export default function StaysPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-4">
              Our Stays
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover curated premium homes in the most desirable urban locations.
            </p>
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <Link 
                  key={property.id} 
                  href={`/stays/${property.id}`}
                  className="group block bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                    <p className="text-muted-foreground mb-4">{property.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">${property.price}</span>
                      <span className="text-sm text-muted-foreground">per night</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}