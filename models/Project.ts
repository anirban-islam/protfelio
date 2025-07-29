import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: [
      {
        type: String,
      },
    ],
    coverImage: {
      type: String, // Cloudinary URL
      required: false,
    },
    liveLink: {
      type: String,
      required: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)