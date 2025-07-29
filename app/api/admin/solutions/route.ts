import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Solution from "@/models/Solution"

export async function GET() {
  try {
    await dbConnect()
    const solutions = await Solution.find().sort({ order: 1 })
    return NextResponse.json(solutions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch solutions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const data = await request.json()
    const solution = await Solution.create(data)
    return NextResponse.json(solution, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create solution" }, { status: 500 })
  }
}
