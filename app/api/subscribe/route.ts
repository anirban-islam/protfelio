import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual MongoDB
const subscribers: any[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { email } = data

    // Validation
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 })
    }

    // Check if already subscribed
    if (subscribers.find((sub) => sub.email === email)) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 })
    }

    // Save to database (mock)
    const newSubscriber = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      isActive: true,
    }

    subscribers.push(newSubscriber)

    return NextResponse.json({ message: "Subscribed successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
