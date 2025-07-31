import { authOptions } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import Hero from "@/models/Hero"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()

    let hero = await Hero.findOne()

    if (!hero) {
      // Seed with default data if empty
      hero = await Hero.create({
        name: "Anirban Islam Emon",
        title: "I'm a Developer",
        location: "Bangladesh",
        languages: "Bangla, English",
        profession: "Computer Engineer",
        university: "Varendra University",
        isAvailable: true,
        profileImage: "",
        resumeUrl: "",
        bio: "Hi! I'm Anirban Islam Emon, a dedicated Computer Science & Engineering (CSE) student and a passionate Full-Stack Developer.",
      })
    }

    return NextResponse.json(hero)
  } catch (error) {
    console.error("❌ GET hero error:", error)
    return NextResponse.json({ error: "Failed to fetch hero data" }, { status: 500 })
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

    let hero = await Hero.findOne()
    if (!hero) {
      hero = await Hero.create(data)
    } else {
      hero = await Hero.findOneAndUpdate({}, data, { new: true })
    }

    return NextResponse.json({ message: "Hero data updated successfully", hero })
  } catch (error) {
    console.error("❌ PUT hero error:", error)
    return NextResponse.json({ error: "Failed to update hero data" }, { status: 500 })
  }
}
