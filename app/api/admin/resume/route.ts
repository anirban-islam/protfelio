import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Resume from "@/models/Resume"
import { uploadFile, deleteFile } from "@/lib/cloudinary"

export async function GET() {
  try {
    await dbConnect()
    const resume = await Resume.findOne({ isActive: true }).sort({ createdAt: -1 })
    return NextResponse.json(resume)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    // Upload to Cloudinary
    const uploadResult = await uploadFile(file, "resume")

    // Deactivate previous resumes
    await Resume.updateMany({}, { isActive: false })

    // Create new resume record
    const resume = await Resume.create({
      fileName: file.name,
      fileUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      isActive: true,
    })

    return NextResponse.json({ message: "Resume uploaded successfully", resume }, { status: 201 })
  } catch (error) {
    console.error("Resume upload error:", error)
    return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const resumeId = searchParams.get("id")

    if (!resumeId) {
      return NextResponse.json({ error: "Resume ID required" }, { status: 400 })
    }

    const resume = await Resume.findById(resumeId)
    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    // Delete from Cloudinary
    await deleteFile(resume.cloudinaryPublicId)

    // Delete from database
    await Resume.findByIdAndDelete(resumeId)

    return NextResponse.json({ message: "Resume deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 })
  }
}
