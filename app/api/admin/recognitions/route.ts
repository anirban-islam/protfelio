import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Recognition from "@/models/Recognition"

export async function GET() {
  await connectDB()
  const recognitions = await Recognition.find({}).sort({ createdAt: -1 })
  return NextResponse.json(
    recognitions.map((r) => ({ ...r.toObject(), id: r._id }))
  )
}

export async function POST(req: Request) {
  await connectDB()
  const data = await req.json()
  const recognition = new Recognition(data)
  await recognition.save()
  return NextResponse.json({ ...recognition.toObject(), id: recognition._id })
}