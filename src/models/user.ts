import mongoose, { Document, Model, Schema } from "mongoose";

// Define the User interface extending mongoose.Document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

// Create the User schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
