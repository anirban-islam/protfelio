"use client"

import { TestimonialsSection } from "@/components/testimonials-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ContactSection } from "@/components/contact-section"
import { RecognitionsSection } from "@/components/recognitions-section"

export function RightAside() {
  return (
    <div className="space-y-6 sticky top-20 h-fit">
      <TestimonialsSection />
      <TechStackSection />
      <div id="contact">
        <ContactSection />
      </div>
      <RecognitionsSection />
    </div>
  )
}
