import { Schema, model, Types } from "mongoose";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface ITask {
  title: string;
  description?: string;
  project: Types.ObjectId;
  sprint: Types.ObjectId;
  assignedTo: Types.ObjectId;
  status: TaskStatus;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: String,

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    sprint: {
      type: Schema.Types.ObjectId,
      ref: "Sprint",
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
