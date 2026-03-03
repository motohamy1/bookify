import { model, models, Schema, Types } from "mongoose";
import { IVoiceSession } from "@/types";

const VoiceSessionSchema = new Schema<IVoiceSession>({
  clerkId: { type: String, required: true, index: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  startedAt: { type: Date, required: true, default: Date.now },
  endedAt: { type: Date },
  durationSeconds: { type: Number, required: true },
  billingPeriodStart: { type: Date, required: true },
}, {timestamps: true});

export const VoiceSession = models.VoiceSession || model<IVoiceSession>('VoiceSession', VoiceSessionSchema)
