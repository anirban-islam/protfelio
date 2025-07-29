import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Testimonial from "@/models/Testimonial"
import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"

// PUT: Update a testimonial by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()
    
    const data = await request.json()
    console.log(params.id)
    const updated = await Testimonial.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    })

    if (!updated) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Testimonial updated successfully",
      testimonial: updated,
    })
  } catch (error) {
    console.error("PUT error:", error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

// DELETE: Delete a testimonial by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()

    const deleted = await Testimonial.findByIdAndDelete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
