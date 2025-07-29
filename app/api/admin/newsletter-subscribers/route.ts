import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Newsletter from "@/models/Newsletter"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    await dbConnect()

    const query: any = {}

    if (search) {
      query.email = { $regex: search, $options: "i" }
    }

    const subscribers = await Newsletter.find(query).sort({ createdAt: -1 })
    return NextResponse.json(subscribers)
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
