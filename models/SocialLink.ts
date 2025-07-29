import mongoose from "mongoose"

const SocialLinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    logo: {
      type: String, // Cloudinary URL
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
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

export default mongoose.models.SocialLink || mongoose.model("SocialLink", SocialLinkSchema)
