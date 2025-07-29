import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Newsletter from "@/models/Newsletter"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email } = body

    // Validation
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() })
    if (existingSubscriber) {
      return NextResponse.json({ error: "Email is already subscribed to our newsletter" }, { status: 409 })
    }

    // Create new subscriber
    const subscriber = await Newsletter.create({
      email: email.toLowerCase(),
      subscribedAt: new Date(),
    })

    console.log("✅ Newsletter subscription created:", subscriber._id)

    return NextResponse.json(
      {
        message: "Successfully subscribed to newsletter!",
        id: subscriber._id,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("❌ Newsletter subscription error:", error)

    if (error.code === 11000) {
      return NextResponse.json({ error: "Email is already subscribed" }, { status: 409 })
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select("email subscribedAt createdAt")

    return NextResponse.json({
      subscribers,
      total: subscribers.length,
    })
  } catch (error) {
    console.error("❌ Error fetching newsletter subscribers:", error)
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 })
  }
}
