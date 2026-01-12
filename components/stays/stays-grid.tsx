import { PropertyCard } from "@/components/property-card"
import { properties } from "@/lib/data"

export function StaysGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  )
}
