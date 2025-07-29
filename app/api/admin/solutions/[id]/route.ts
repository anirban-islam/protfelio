import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Solution from "@/models/Solution"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const data = await request.json()
    const solution = await Solution.findByIdAndUpdate(params.id, data, { new: true })

    if (!solution) {
      return NextResponse.json({ error: "Solution not found" }, { status: 404 })
    }

    return NextResponse.json(solution)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update solution" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const solution = await Solution.findByIdAndDelete(params.id)

    if (!solution) {
      return NextResponse.json({ error: "Solution not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Solution deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete solution" }, { status: 500 })
  }
}
