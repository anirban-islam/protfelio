import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Solution from "@/models/Solution"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const services = await Solution.find().sort({ createdAt: -1 })
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
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

    const service = await Solution.create(body)
    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
