import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: Array, 
  totalPrice: { type: Number, required: true }
});

export const Order = mongoose.model('Order', OrderSchema);