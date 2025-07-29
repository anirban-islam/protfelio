import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual database
const projects = [
  {
    id: "1",
    title: "App Revolution",
    description: "Empowering users with technology",
    image: "/placeholder.svg?height=200&width=300",
    techStack: ["React", "Node.js", "MongoDB"],
    url: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    title: "Future Apps",
    description: "Empowering users with technology",
    image: "/placeholder.svg?height=200&width=300",
    techStack: ["React Native", "Firebase"],
    url: "https://example.com",
    featured: false,
  },
]

export async function GET() {
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const newProject = {
      id: Date.now().toString(),
      ...data,
    }
    cons
    projects.push(newProject)

    return NextResponse.json({ message: "Project created successfully", project: newProject })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
