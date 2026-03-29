import mongoose from 'mongoose';
import 'dotenv/config';
import { Shop } from './models/Shop.js';

const initialShops = [
  {
    name: "Mc Donny",
    products: [
      { name: "Big Big Burger", price: 15, image: "https://picsum.photos/200/150?random=1" },
      { name: "Small Big Burger", price: 10, image: "https://picsum.photos/200/150?random=2" }
    ]
  },
  {
    name: "CFK",
    products: [
      { name: "Chicken Wings", price: 14, image: "https://picsum.photos/200/150?random=3" },
      { name: "Hot Bucket", price: 22, image: "https://picsum.photos/200/150?random=4" }
    ]
  },
  {
    name: "Pizza Port",
    products: [
      { name: "Pepperoni Pizza", price: 18, image: "https://picsum.photos/200/150?random=5" },
      { name: "Margarita Pizza", price: 16, image: "https://picsum.photos/200/150?random=6" }
    ]
  },
  {
    name: "Sushi Master",
    products: [
      { name: "California Roll", price: 12, image: "https://picsum.photos/200/150?random=7" },
      { name: "Philadelphia Roll", price: 14, image: "https://picsum.photos/200/150?random=8" }
    ]
  },
  {
    name: "Salad Bar",
    products: [
      { name: "Caesar Salad", price: 9, image: "https://picsum.photos/200/150?random=9" },
      { name: "Greek Salad", price: 8, image: "https://picsum.photos/200/150?random=10" }
    ]
  },
  {
    name: "Wok & Go",
    products: [
      { name: "Rice with Chicken", price: 11, image: "https://picsum.photos/200/150?random=11" },
      { name: "Pad Thai", price: 13, image: "https://picsum.photos/200/150?random=12" }
    ]
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('🌱 Підключено. Наповнюємо базу на 6 магазинів...');

    await Shop.deleteMany({});
    await Shop.insertMany(initialShops);

    console.log('✨ Готово! Тепер у тебе великий вибір магазинів.');
    process.exit();
  } catch (error) {
    console.error('❌ Помилка:', error);
    process.exit(1);
  }
}

seedDB();