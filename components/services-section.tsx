import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function ServicesSection() {
  const services = [
    "Full-Stack Development Services",
    "Backend API & Database Architecture",
    "SaaS Product Development",
    "E-Commerce Platform Development",
    "API Integration & Development",
    "Mobile-First Web Design",
    "Cross-Platform App Development",
    "Modern UI/UX Design Services"

  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">💼</span>
          <span>Solutions Suite</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {services.map((service, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Checkbox checked readOnly />
            <span className="text-sm text-gray-700">{service}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
