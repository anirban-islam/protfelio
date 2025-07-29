import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function ServicesSection() {
  const services = [
    "Front End Development",
    "Web App Development",
    "Software Development",
    "Mobile App Development",
    "User Interface Design",
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
