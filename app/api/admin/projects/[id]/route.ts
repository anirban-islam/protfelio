import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Project from "@/models/Project"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectDB()
  const data = await req.json()
  const updated = await Project.findByIdAndUpdate(params.id, data, { new: true })
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectDB()
  await Project.findByIdAndDelete(params.id)
  return NextResponse.json({ message: "Deleted successfully" })
}