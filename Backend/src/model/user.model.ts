import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  displayName: string;
  email: string;
  photo: string;
}

const userSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
