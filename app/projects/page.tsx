import { MiddleContentWrapper } from "@/components/layout/middle-content-wrapper"
import { PublicLayout } from "@/components/layout/public-layout"
import { ProjectsSection } from "@/components/projects-section"

export default function ProjectsPage() {
  return (
    <PublicLayout>
      <MiddleContentWrapper
        title="My Projects"
        description="Explore my portfolio of web applications and digital solutions"
      >
        <ProjectsSection />
      </MiddleContentWrapper>
    </PublicLayout>
  )
}
