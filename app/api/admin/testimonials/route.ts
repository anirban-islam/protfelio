import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Testimonial from "@/models/Testimonial"
import { getServerSession } from "next-auth"
import { NextResponse, type NextRequest } from "next/server"

// GET: Fetch all testimonials
export async function GET() {
  try {
    await connectDB()
    const testimonials = await Testimonial.find().sort({ createdAt: -1 })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

// POST: Create a new testimonial
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()
    const data = await req.json()
    console.log(data);
    const newTestimonial = new Testimonial(data)
    await newTestimonial.save()

    return NextResponse.json({
      message: "Testimonial created successfully",
      testimonial: newTestimonial,
    })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
