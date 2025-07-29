import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import About from "@/models/About"

export async function GET() {
  try {
    await connectDB()

    let about = await About.findOne()

    // If no about data exists, return default
    if (!about) {
      about = {
        bio: "👋 Hi! I'm Anirban Islam Emon, a dedicated Computer Science & Engineering (CSE) student and a passionate Full-Stack Developer with a strong focus on building modern, scalable, and high-performance web applications.",
        mission:
          "My mission is simple — Build impactful products that deliver exceptional value to users and businesses while improving continuously as a developer.",
        goals: [
          "Build scalable web applications",
          "Learn new technologies continuously",
          "Help businesses grow through technology",
        ],
        currentlyLearning: ["Next.js 14", "TypeScript", "GraphQL"],
      }
    }

    return NextResponse.json(about)
  } catch (error) {
    console.error("❌ Error fetching about data:", error)
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 })
  }
}
