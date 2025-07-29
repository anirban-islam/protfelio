import { describe, it, expect } from "vitest"
import { POST } from "@/app/api/contact/route"
import { NextRequest } from "next/server"

describe("/api/contact", () => {
  it("saves contact message successfully", async () => {
    const contactData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      mobile: "+1234567890",
      message: "Test message",
    }

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
      headers: { "Content-Type": "application/json" },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe("Message sent successfully")
  })

  it("validates required fields", async () => {
    const incompleteData = {
      firstName: "John",
      // Missing required fields
    }

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(incompleteData),
      headers: { "Content-Type": "application/json" },
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  it("validates email format", async () => {
    const invalidEmailData = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      mobile: "+1234567890",
      message: "Test message",
    }

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(invalidEmailData),
      headers: { "Content-Type": "application/json" },
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })
})
