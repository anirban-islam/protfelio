import mongoose from "mongoose"

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema)
