import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Technology from "@/models/Technology"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    await connectDB()

    const technology = await Technology.findByIdAndUpdate(params.id, data, { new: true, runValidators: true })

    if (!technology) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 })
    }

    console.log("✅ Technology updated:", technology._id)

    return NextResponse.json({
      message: "Technology updated successfully",
      technology,
    })
  } catch (error: any) {
    console.error("❌ Error updating technology:", error)

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update technology" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const technology = await Technology.findByIdAndDelete(params.id)

    if (!technology) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 })
    }

    console.log("✅ Technology deleted:", technology._id)

    return NextResponse.json({ message: "Technology deleted successfully" })
  } catch (error) {
    console.error("❌ Error deleting technology:", error)
    return NextResponse.json({ error: "Failed to delete technology" }, { status: 500 })
  }
}
