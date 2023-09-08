import mongoose from "mongoose";

// User Model
const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
module.exports = { User };
