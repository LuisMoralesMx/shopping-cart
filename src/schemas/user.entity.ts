import mongoose from "mongoose";

// Model
export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string
}

// User Schema
const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
});

export const User = mongoose.model("User", UserSchema);
module.exports = { User };
