import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { HeroSection } from "@/components/hero-section"

describe("HeroSection", () => {
  it("renders hero information correctly", () => {
    render(<HeroSection />)

    expect(screen.getByText("Anirban Islam Emon")).toBeInTheDocument()
    expect(screen.getByText("I'm a Developer")).toBeInTheDocument()
    expect(screen.getByText("Bangladesh")).toBeInTheDocument()
    expect(screen.getByText("Available to work")).toBeInTheDocument()
    expect(screen.getByText("Resume")).toBeInTheDocument()
  })

  it("shows availability status", () => {
    render(<HeroSection />)

    const availabilityBadge = screen.getByText("Available to work")
    expect(availabilityBadge).toHaveClass("bg-green-100", "text-green-700")
  })

  it("has resume download button", () => {
    render(<HeroSection />)

    const resumeButton = screen.getByRole("button", { name: /resume/i })
    expect(resumeButton).toBeInTheDocument()
  })
})
