"use client"

import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { SocialSection } from "@/components/social-section"
import { NewsletterSection } from "@/components/newsletter-section"

export function LeftAside() {
  return (
    <div className="space-y-6 sticky top-20 h-fit">
      <HeroSection />
      <ServicesSection />
      <SocialSection />
      <NewsletterSection />
    </div>
  )
}
