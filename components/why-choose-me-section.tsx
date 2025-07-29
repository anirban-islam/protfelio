import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function WhyChooseMeSection() {
  const skills = ["Team player", "Creative mind", "Keen to details", "Leading capacity"]

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
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
