import mongoose from "mongoose";

// Product Model
const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
});

export const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };
