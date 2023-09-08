import mongoose from "mongoose";
import { Product } from "./product.entity";

// Cart Item Model
const CartItemSchema = new mongoose.Schema({
  product: {
    type: [Product.schema],
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

export const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = { CartItem };

// Cart Model
const CartSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  items: {
    type: [CartItem.schema],
    required: false,
  },
});

export const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart };