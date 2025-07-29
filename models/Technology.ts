import mongoose from "mongoose"

const TechnologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Technology name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"],
      default: "Other",
    },
    proficiency: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 50,
    },
    logo: {
      type: String,
      trim: true,
    },
    workAs: {
      type: String,
      trim: true,
      maxlength: [100, "Work description cannot exceed 100 characters"],
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Technology || mongoose.model("Technology", TechnologySchema)
