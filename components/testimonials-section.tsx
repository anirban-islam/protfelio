import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York City, USA",
      date: "11 Feb 24",
      rating: 5,
      comment:
        "Anirban's design skills are extraordinary. He took my nebulous ideas and created a stunning website that truly reflects my brand.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">💬</span>
          <span>Testimonials</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900">{testimonial.name}</h4>
                <p className="text-xs text-gray-500">{testimonial.location}</p>
              </div>
              <span className="text-xs text-gray-400">{testimonial.date}</span>
            </div>

            <div className="flex space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
