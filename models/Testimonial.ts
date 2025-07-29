import mongoose from "mongoose"

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    avatar: { type: String },
    date: { type: String },
    company: { type: String },
    position: { type: String },
  },
  { timestamps: true }
)


export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema)
