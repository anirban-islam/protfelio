import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import SocialLink from "@/models/SocialLink"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      const socialLinks = await SocialLink.find().sort({ createdAt: -1 })
    return NextResponse.json(socialLinks)
    }

    await dbConnect()
    const socialLinks = await SocialLink.find().sort({ createdAt: -1 })
    return NextResponse.json(socialLinks)
  } catch (error) {
    console.error("Error fetching social links:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    await dbConnect()

    const socialLink = await SocialLink.create(body)
    return NextResponse.json(socialLink, { status: 201 })
  } catch (error) {
    console.error("Error creating social link:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
