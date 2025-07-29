import mongoose from "mongoose"

const AboutSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    mission: {
      type: String,
      required: true,
      trim: true,
    },
    goals: {
      type: [String],
      default: [],
    },
    currentlyLearning: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.About || mongoose.model("About", AboutSchema)
