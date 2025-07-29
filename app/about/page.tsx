import { PublicLayout } from "@/components/layout/public-layout"
import { MiddleContentWrapper } from "@/components/layout/middle-content-wrapper"
import { AboutSection } from "@/components/about-section"
import { WhyChooseMeSection } from "@/components/why-choose-me-section"

export default function AboutPage() {
  return (
    <PublicLayout>
      <MiddleContentWrapper
        title="About Me"
        description="Get to know more about my journey, skills, and passion for development"
      >
        <div className="space-y-6">
          <AboutSection />
          <WhyChooseMeSection />
        </div>
      </MiddleContentWrapper>
    </PublicLayout>
  )
}
