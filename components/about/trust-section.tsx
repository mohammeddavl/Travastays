import { ShieldCheck, Award, Clock, Users } from "lucide-react"

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description: "Every property undergoes a comprehensive 50-point inspection before joining our collection.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Regular audits and guest feedback ensure our standards remain consistently excellent.",
  },
  {
    icon: Clock,
    title: "Instant Support",
    description: "Our concierge team responds within minutes, available 24 hours a day, 7 days a week.",
  },
  {
    icon: Users,
    title: "10,000+ Happy Guests",
    description: "Join thousands of satisfied travelers who have experienced the Travastays difference.",
  },
]

export function TrustSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4 text-center">
          Trust & Quality Assurance
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Your comfort and safety are our top priorities. Here's how we ensure every stay exceeds expectations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point) => (
            <div key={point.title} className="bg-card p-8 rounded-lg border border-border text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-6">
                <point.icon className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3">{point.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
