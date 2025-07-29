import mongoose from "mongoose"

const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Handle duplicate key error
NewsletterSchema.post("save", (error: any, doc: any, next: any) => {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Email already subscribed"))
  } else {
    next(error)
  }
})

export default mongoose.models.Newsletter || mongoose.model("Newsletter", NewsletterSchema)
