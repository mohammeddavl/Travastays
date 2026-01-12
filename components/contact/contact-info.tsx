import { Mail, Phone, MapPin } from "lucide-react"

const cities = [
  { name: "New York", address: "350 Fifth Avenue, Suite 4500" },
  { name: "Chicago", address: "233 S Wacker Dr, Suite 8400" },
  { name: "San Francisco", address: "555 California St, Floor 40" },
  { name: "Miami", address: "1001 Brickell Bay Dr, Suite 2700" },
]

export function ContactInfo() {
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Get in Touch</h2>

      <div className="space-y-6 mb-12">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Mail className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Email</h3>
            <a href="mailto:hello@travastays.com" className="text-muted-foreground hover:text-accent transition-colors">
              hello@travastays.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Phone className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Phone</h3>
            <a href="tel:+15551234567" className="text-muted-foreground hover:text-accent transition-colors">
              +1 (555) 123-4567
            </a>
            <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Our Presence</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cities.map((city) => (
            <div key={city.name} className="p-4 bg-secondary rounded-lg">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">{city.name}</h4>
                  <p className="text-sm text-muted-foreground">{city.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
