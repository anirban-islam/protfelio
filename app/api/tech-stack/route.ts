import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Technology from "@/models/Technology"

export async function GET() {
  try {
    await connectDB()

    const technologies = await Technology.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select("name category proficiency logo workAs color")

    return NextResponse.json(technologies)
  } catch (error) {
    console.error("❌ Error fetching tech stack:", error)
    return NextResponse.json({ error: "Failed to fetch tech stack" }, { status: 500 })
  }
}
