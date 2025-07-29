import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Mock database - replace with actual database
const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "New York City, USA",
    comment:
      "Anirban's design skills are extraordinary. He took my nebulous ideas and created a stunning website that truly reflects my brand.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
    date: "11 Feb 24",
  },
]

export async function GET() {
  return NextResponse.json(testimonials)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const newTestimonial = {
      id: Date.now().toString(),
      ...data,
    }

    testimonials.push(newTestimonial)

    return NextResponse.json({ message: "Testimonial created successfully", testimonial: newTestimonial })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
