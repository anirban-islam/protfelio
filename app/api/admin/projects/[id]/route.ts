import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual database
let projects = [
  {
    id: "1",
    title: "App Revolution",
    description: "Empowering users with technology",
    image: "/placeholder.svg?height=200&width=300",
    techStack: ["React", "Node.js", "MongoDB"],
    url: "https://example.com",
    featured: true,
  },
]

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const projectIndex = projects.findIndex((p) => p.id === params.id)

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projects[projectIndex] = { ...projects[projectIndex], ...data }

    return NextResponse.json({ message: "Project updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    projects = projects.filter((p) => p.id !== params.id)

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}