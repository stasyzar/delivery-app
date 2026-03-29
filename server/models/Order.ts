import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: Array, // Список обраних страв
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', OrderSchema);