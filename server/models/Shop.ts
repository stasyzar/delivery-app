import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {type: String, required: true},
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rating: {type: Number, required: true},
  products: [ProductSchema]
});

export const Shop = mongoose.model('Shop', ShopSchema);