import { Schema, model, Types } from "mongoose";

export interface IProject {
  name: string;
  description?: string;
  client: string;
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  status: "planned" | "active" | "completed" | "archived";
  thumbnail?: string;
  createdBy: Types.ObjectId;
  members: Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: String,
    client: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    budget: Number,
    status: {
      type: String,
      enum: ["planned", "active", "completed", "archived"],
      default: "planned",
    },
    thumbnail: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
