import { describe, it, expect, beforeEach, vi } from "vitest"
import { GET, POST } from "@/app/api/projects/route"
import { NextRequest } from "next/server"

// Mock next-auth
vi.mock("next-auth/next", () => ({
  getServerSession: vi.fn(),
}))

describe("/api/projects", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe("GET /api/projects", () => {
    it("returns projects list", async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
    })
  })

  describe("POST /api/projects", () => {
    it("creates new project when authenticated", async () => {
      const { getServerSession } = await import("next-auth/next")
      ;(getServerSession as any).mockResolvedValue({ user: { id: "1" } })

      const projectData = {
        title: "New Project",
        description: "Test Description",
        techStack: ["React"],
        url: "https://test.com",
      }

      const request = new NextRequest("http://localhost:3000/api/projects", {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: { "Content-Type": "application/json" },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe("Project created successfully")
    })

    it("returns 401 when not authenticated", async () => {
      const { getServerSession } = await import("next-auth/next")
      ;(getServerSession as any).mockResolvedValue(null)

      const request = new NextRequest("http://localhost:3000/api/projects", {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
    })
  })
})
