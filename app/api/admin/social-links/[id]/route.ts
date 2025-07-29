import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import SocialLink from "@/models/SocialLink"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    await dbConnect()

    const socialLink = await SocialLink.findByIdAndUpdate(params.id, body, { new: true })

    if (!socialLink) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 })
    }

    return NextResponse.json(socialLink)
  } catch (error) {
    console.error("Error updating social link:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const socialLink = await SocialLink.findByIdAndDelete(params.id)

    if (!socialLink) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Social link deleted successfully" })
  } catch (error) {
    console.error("Error deleting social link:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
