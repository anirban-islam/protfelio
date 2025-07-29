import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Contact from "@/models/Contact"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""

    await dbConnect()

    const query: any = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ]
    }

    if (status) {
      query.status = status
    }

    const messages = await Contact.find(query).sort({ createdAt: -1 })
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
