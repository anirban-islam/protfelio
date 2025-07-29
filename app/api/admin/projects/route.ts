import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Project from "@/models/Project"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  const projects = await Project.find({}).sort({ createdAt: -1 })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectDB()
  const data = await req.json()
  const project = new Project(data)
  await project.save()
  return NextResponse.json(project)
}