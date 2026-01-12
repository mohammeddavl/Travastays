import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { OurStory } from "@/components/about/our-story"
import { TrustSection } from "@/components/about/trust-section"

export const metadata = {
  title: "About Us | Travastays",
  description: "Learn about Travastays' mission to provide premium, reliable urban short-term stays.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <AboutHero />
        <OurStory />
        <TrustSection />
      </main>
      <Footer />
    </>
  )
}
