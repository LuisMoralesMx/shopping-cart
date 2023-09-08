import mongoose from "mongoose";
import { Cart, CartItem } from "./cart.entity";

// Payment Model
const PaymentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  creditCard: {
    type: String,
    required: false,
  },
});

export const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = { Payment };

// Delivery Model
const DeliverySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

export const Delivery = mongoose.model("Delivery", DeliverySchema);
module.exports = { Delivery };

// Order Model
const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  cartId: {
    type: String,
    required: false,
  },
  items: {
    type: [Cart.schema],
    required: false,
  },
  payment: {
    type: [Payment.schema],
    required: false,
  },
  delivery: {
    type: [Delivery.schema],
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  total: {
    type: Number,
    required: false,
  },
});

export const Order = mongoose.model("Order", OrderSchema);
module.exports = { Order };
