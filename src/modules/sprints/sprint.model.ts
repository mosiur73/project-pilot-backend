import { Schema, model, Types } from "mongoose";

export interface ISprint {
  title: string;
  project: Types.ObjectId;
  startDate: Date;
  endDate: Date;
}

const sprintSchema = new Schema<ISprint>(
  {
    title: { type: String, required: true },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Sprint = model<ISprint>("Sprint", sprintSchema);
