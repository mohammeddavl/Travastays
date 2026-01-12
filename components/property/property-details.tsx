import { Wifi, Wind, UtensilsCrossed, Car, Bed, Bath, Users } from "lucide-react"

interface Property {
  name: string
  location: string
  description: string
  bedrooms: number
  bathrooms: number
  guests: number
  amenities: string[]
}

interface PropertyDetailsProps {
  property: Property
}

const amenityLabels: Record<string, { icon: typeof Wifi; label: string }> = {
  wifi: { icon: Wifi, label: "High-Speed WiFi" },
  ac: { icon: Wind, label: "Air Conditioning" },
  kitchen: { icon: UtensilsCrossed, label: "Fully Equipped Kitchen" },
  parking: { icon: Car, label: "Private Parking" },
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-2">{property.name}</h1>
      <p className="text-muted-foreground text-lg mb-8">{property.location}</p>

      <div className="flex flex-wrap gap-6 pb-8 border-b border-border mb-8">
        <div className="flex items-center gap-2 text-foreground">
          <Bed className="h-5 w-5 text-accent" />
          <span>
            {property.bedrooms} Bedroom{property.bedrooms > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <Bath className="h-5 w-5 text-accent" />
          <span>
            {property.bathrooms} Bathroom{property.bathrooms > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-accent" />
          <span>Up to {property.guests} Guests</span>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">About This Property</h2>
        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
      </div>

      <div className="mb-10">
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Amenities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {property.amenities.map((amenity) => {
            const item = amenityLabels[amenity.toLowerCase()]
            if (!item) return null
            const Icon = item.icon
            return (
              <div key={amenity} className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Icon className="h-5 w-5 text-accent" />
                <span className="text-foreground">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Property Manager</h2>
        <div className="flex items-center gap-4 p-6 bg-card border border-border rounded-lg">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="font-serif text-xl font-semibold text-accent">TS</span>
          </div>
          <div>
            <p className="font-semibold text-card-foreground">Travastays Concierge</p>
            <p className="text-sm text-muted-foreground">Verified Host · 24/7 Support</p>
          </div>
        </div>
      </div>
    </div>
  )
}
