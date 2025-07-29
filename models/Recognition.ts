import mongoose, { Document, Schema } from "mongoose"

export interface IRecognition extends Document {
  title: string
  description: string
  icon: string
  color: string
  date: string
  issuer?: string
  credentialUrl?: string
}

const RecognitionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    date: { type: String, required: true },
    issuer: { type: String },
    credentialUrl: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.Recognition || mongoose.model<IRecognition>("Recognition", RecognitionSchema)