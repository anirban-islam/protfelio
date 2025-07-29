import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Stats from "@/models/Stats"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    let stats = await Stats.findOne()

    // If no stats exist, create default ones
    if (!stats) {
      stats = await Stats.create({
        projectsCompleted: 50,
        happyClients: 30,
        yearsExperience: 5,
        technologiesMastered: 25,
      })
      console.log("✅ Default stats created")
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("❌ Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    await connectDB()

    // Parse numbers from display format (e.g., "55+" -> 55)
    const parseNumber = (value: string | number) => {
      if (typeof value === "number") return value
      return Number.parseInt(value.toString().replace(/[^0-9]/g, "")) || 0
    }

    const updateData = {
      projectsCompleted: parseNumber(data.projects || data.projectsCompleted),
      happyClients: parseNumber(data.clients || data.happyClients),
      yearsExperience: parseNumber(data.experience || data.yearsExperience),
      technologiesMastered: parseNumber(data.certifications || data.technologiesMastered),
    }

    let stats = await Stats.findOne()

    if (!stats) {
      stats = await Stats.create(updateData)
      console.log("✅ Stats created:", stats._id)
    } else {
      stats = await Stats.findOneAndUpdate({}, updateData, { new: true })
      console.log("✅ Stats updated:", stats._id)
    }

    return NextResponse.json({
      message: "Statistics updated successfully",
      stats,
    })
  } catch (error: any) {
    console.error("❌ Error updating statistics:", error)

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update statistics" }, { status: 500 })
  }
}
