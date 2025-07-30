"use client"

import { HeroSection } from "@/components/hero-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ServicesSection } from "@/components/services-section"
import { SocialSection } from "@/components/social-section"
import { usePathname } from "next/navigation"

export function LeftAside() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div className="space-y-6 sticky top-20 h-fit">
      <HeroSection />

      {/* Services Section: visible on home or on larger screens */}
      {isHome ? (
        <ServicesSection />
      ) : (
        <div className="hidden sm:block">
          <ServicesSection />
        </div>
      )}

      {/* Social + Newsletter: same logic */}
      {isHome ? (
        <>
          <SocialSection />
          <NewsletterSection />
        </>
      ) : (
        <>
          <div className="hidden sm:block">
            <SocialSection />
          </div>
          <div className="hidden sm:block">
            <NewsletterSection />
          </div>
        </>
      )}
    </div>
  )
}
