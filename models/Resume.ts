import mongoose from "mongoose"

const ResumeSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    uploadedBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema)
