import { CallToAction } from '@/components/landing/CallToAction'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { SiteFooter } from '@/components/landing/SiteFooter'
import { SiteHeader } from '@/components/landing/SiteHeader'
import { TestimonialSection } from '@/components/landing/TestimonialSection'
import { TrustedBy } from '@/components/landing/TrustedBy'

export let LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <SiteHeader />

      <main>
        <HeroSection />
        <TrustedBy />
        <FeaturesSection />
        <TestimonialSection />
        <CallToAction />
      </main>

      <SiteFooter />
    </div>
  )
}
