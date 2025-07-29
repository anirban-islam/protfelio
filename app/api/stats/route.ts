import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Stats from "@/models/Stats"

export async function GET() {
  try {
    await connectDB()

    let stats = await Stats.findOne()

    // If no stats exist, return default values
    if (!stats) {
      stats = {
        projectsCompleted: 50,
        happyClients: 30,
        yearsExperience: 5,
        technologiesMastered: 25,
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("❌ Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
