import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WhyChooseMeSection() {
  const skills = [
  "Next.js Developer",
  "API Integration Specialist",
  "Creative UI/UX Designer",
  "Full-Stack Web Developer",
  "Team Player",
  "Clean Code Enthusiast",
  "Pixel-Perfect Execution",
  "Detail-Oriented",
  "Fast Learner",
  "Problem Solver",
  "Responsive Design Expert",
  "Performance Optimizer",
  "Version Control Savvy",
  "Self-Motivated",
  "Agile Collaborator",
  "Design-Driven Thinker",
  "Scalable Architecture Builder",
  "MongoDB & Node.js Backend"
]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">🤔</span>
          <span>Why you should choose me?</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
