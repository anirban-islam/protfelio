import mongoose from "mongoose"

const StatsSchema = new mongoose.Schema(
  {
    projectsCompleted: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    happyClients: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    yearsExperience: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    technologiesMastered: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Stats || mongoose.model("Stats", StatsSchema)
