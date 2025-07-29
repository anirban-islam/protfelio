import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import About from "@/models/About"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    let about = await About.findOne()

    // If no about data exists, create default
    if (!about) {
      about = await About.create({
        bio: "👋 Hi! I'm Anirban Islam Emon, a dedicated Computer Science & Engineering (CSE) student and a passionate Full-Stack Developer with a strong focus on building modern, scalable, and high-performance web applications.",
        mission:
          "My mission is simple — Build impactful products that deliver exceptional value to users and businesses while improving continuously as a developer.",
        goals: [
          "Build scalable web applications",
          "Learn new technologies continuously",
          "Help businesses grow through technology",
          "Create user-friendly digital experiences",
        ],
        currentlyLearning: ["Next.js 14", "TypeScript", "GraphQL", "Cloud Architecture"],
      })
      console.log("✅ Default about data created")
    }

    return NextResponse.json(about)
  } catch (error) {
    console.error("❌ Error fetching about data:", error)
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 })
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

    let about = await About.findOne()

    if (!about) {
      about = await About.create(data)
      console.log("✅ About data created:", about._id)
    } else {
      about = await About.findOneAndUpdate({}, data, { new: true })
      console.log("✅ About data updated:", about._id)
    }

    return NextResponse.json({
      message: "About section updated successfully",
      about,
    })
  } catch (error: any) {
    console.error("❌ Error updating about data:", error)

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update about data" }, { status: 500 })
  }
}
