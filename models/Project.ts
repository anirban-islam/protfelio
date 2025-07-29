import mongoose, { Document, Schema } from "mongoose"

export interface IProject extends Document {
  title: string
  description: string
  image: string
  techStack: string[]
  url: string
  githubUrl: string
  featured: boolean
  status: "completed" | "in-progress" | "planned"
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    techStack: { type: [String], required: true },
    url: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["completed", "in-progress", "planned"], required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)