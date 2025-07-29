import { connectDB } from "@/lib/mongodb"
import Recognition from "@/models/Recognition"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  const data = await req.json()
  const updated = await Recognition.findByIdAndUpdate(params.id, data, { new: true })
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ ...updated.toObject(), id: updated._id })
}


export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  await Recognition.findByIdAndDelete(params.id)
  return NextResponse.json({ message: "Recognition deleted successfully" })
}
