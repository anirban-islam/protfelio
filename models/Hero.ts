import mongoose, { Schema, model, models } from "mongoose"

const heroSchema = new Schema(
  {
    name: String,
    title: String,
    location: String,
    languages: String,
    profession: String,
    university: String,
    isAvailable: Boolean,
    profileImage: String,
    resumeUrl: String,
  },
  { timestamps: true }
)

const Hero = models.Hero || model("Hero", heroSchema)
export default Hero
