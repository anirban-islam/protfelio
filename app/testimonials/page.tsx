import { PublicLayout } from "@/components/layout/public-layout"
import { MiddleContentWrapper } from "@/components/layout/middle-content-wrapper"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function TestimonialsPage() {
  return (
    <PublicLayout>
      <MiddleContentWrapper title="Client Testimonials" description="What my clients say about working with me">
        <div className="max-w-4xl mx-auto">
          <TestimonialsSection />
        </div>
      </MiddleContentWrapper>
    </PublicLayout>
  )
}
