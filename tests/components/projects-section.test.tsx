import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { ProjectsSection } from "@/components/projects-section"

// Mock fetch
global.fetch = vi.fn()

describe("ProjectsSection", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("renders projects correctly", async () => {
    const mockProjects = [
      {
        id: "1",
        title: "Test Project",
        description: "Test Description",
        image: "/test-image.jpg",
        techStack: ["React", "Node.js"],
        url: "https://test.com",
      },
    ]
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    })

    render(<ProjectsSection />)

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument()
      expect(screen.getByText("Test Description")).toBeInTheDocument()
      expect(screen.getByText("React")).toBeInTheDocument()
      expect(screen.getByText("Node.js")).toBeInTheDocument()
    })
  })

  it("handles loading state", () => {
    ;(fetch as any).mockImplementation(() => new Promise(() => {}))

    render(<ProjectsSection />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("handles error state", async () => {
    ;(fetch as any).mockRejectedValueOnce(new Error("Failed to fetch"))

    render(<ProjectsSection />)

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
