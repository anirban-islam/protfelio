import { PublicLayout } from "@/components/layout/public-layout"
import { MiddleContentWrapper } from "@/components/layout/middle-content-wrapper"
import { AboutSection } from "@/components/about-section"
import { StatisticsSection } from "@/components/statistics-section"
import { ProjectsSection } from "@/components/projects-section"
import { WhyChooseMeSection } from "@/components/why-choose-me-section"

export default function Home() {
  return (
    <PublicLayout>
      <MiddleContentWrapper>
        <div className="space-y-6">
          <AboutSection />
          <StatisticsSection />
          <ProjectsSection />
          <WhyChooseMeSection />
        </div>
      </MiddleContentWrapper>
    </PublicLayout>
  )
}
