// /models/User.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    } // will be hashed
  },
  { timestamps: true }
);

const User = models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
