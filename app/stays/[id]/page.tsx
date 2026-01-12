import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyDetails } from "@/components/property/property-details"
import { PropertyBooking } from "@/components/property/property-booking"
import { properties } from "@/lib/data"

interface PropertyPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params
  const property = properties.find((p) => p.id === id)

  if (!property) {
    return { title: "Property Not Found | Travastays" }
  }

  return {
    title: `${property.name} | Travastays`,
    description: property.description,
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params
  const property = properties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24">
        <PropertyGallery images={property.images} name={property.name} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <PropertyDetails property={property} />
            </div>
            <div>
              <PropertyBooking price={property.price} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
