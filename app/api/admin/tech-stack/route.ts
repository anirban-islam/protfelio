import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Technology from "@/models/Technology"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const technologies = await Technology.find({ isActive: true }).sort({ createdAt: -1 })

    return NextResponse.json(technologies)
  } catch (error) {
    console.error("❌ Error fetching technologies:", error)
    return NextResponse.json({ error: "Failed to fetch technologies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    await connectDB()

    const technology = await Technology.create({
      ...data,
      isActive: true,
    })

    console.log("✅ Technology created:", technology._id)

    return NextResponse.json(
      {
        message: "Technology added successfully",
        technology,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("❌ Error creating technology:", error)

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create technology" }, { status: 500 })
  }
}
