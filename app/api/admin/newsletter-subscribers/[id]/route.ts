import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Newsletter from "@/models/Newsletter"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const subscriber = await Newsletter.findByIdAndDelete(params.id)

    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Subscriber deleted successfully" })
  } catch (error) {
    console.error("Error deleting subscriber:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
