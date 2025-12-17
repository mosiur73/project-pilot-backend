import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "member";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,select: false, },
    role: {
      type: String,
      enum: ["admin", "manager", "member"],
      default: "member",

    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
