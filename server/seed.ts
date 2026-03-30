import mongoose from 'mongoose';
import 'dotenv/config';
import { Shop } from './models/Shop.js';

const initialShops = [
  {
    name: "Mc Donny",
    products: [
      { name: "Big Big Burger", price: 15, image: "https://picsum.photos/200/150?random=1" },
      { name: "Small Big Burger", price: 10, image: "https://picsum.photos/200/150?random=2" },
      { name: "Cheese Master", price: 12, image: "https://picsum.photos/200/150?random=13" },
      { name: "French Fries", price: 5, image: "https://picsum.photos/200/150?random=14" },
      { name: "Vanilla Milkshake", price: 8, image: "https://picsum.photos/200/150?random=20" }
    ]
  },
  {
    name: "CFK",
    products: [
      { name: "Chicken Wings", price: 14, image: "https://picsum.photos/200/150?random=3" },
      { name: "Hot Bucket", price: 22, image: "https://picsum.photos/200/150?random=4" },
      { name: "Zinger Burger", price: 13, image: "https://picsum.photos/200/150?random=21" },
      { name: "Chicken Strips", price: 11, image: "https://picsum.photos/200/150?random=22" }
    ]
  },
  {
    name: "Pizza Port",
    products: [
      { name: "Pepperoni Pizza", price: 18, image: "https://picsum.photos/200/150?random=5" },
      { name: "Margarita Pizza", price: 16, image: "https://picsum.photos/200/150?random=6" },
      { name: "Four Cheese", price: 20, image: "https://picsum.photos/200/150?random=18" },
      { name: "BBQ Chicken", price: 19, image: "https://picsum.photos/200/150?random=19" },
      { name: "Hawaiian Pizza", price: 17, image: "https://picsum.photos/200/150?random=23" }
    ]
  },
  {
    name: "Sushi Master",
    products: [
      { name: "California Roll", price: 12, image: "https://picsum.photos/200/150?random=7" },
      { name: "Philadelphia Roll", price: 14, image: "https://picsum.photos/200/150?random=8" },
      { name: "Dragon Roll", price: 18, image: "https://picsum.photos/200/150?random=15" },
      { name: "Miso Soup", price: 7, image: "https://picsum.photos/200/150?random=16" },
      { name: "Tempura Shrimp", price: 11, image: "https://picsum.photos/200/150?random=17" }
    ]
  },
  {
    name: "Salad Bar",
    products: [
      { name: "Caesar Salad", price: 9, image: "https://picsum.photos/200/150?random=9" },
      { name: "Greek Salad", price: 8, image: "https://picsum.photos/200/150?random=10" },
      { name: "Tuna Salad", price: 11, image: "https://picsum.photos/200/150?random=24" },
      { name: "Fruit Salad", price: 7, image: "https://picsum.photos/200/150?random=25" }
    ]
  },
  {
    name: "Wok & Go",
    products: [
      { name: "Rice with Chicken", price: 11, image: "https://picsum.photos/200/150?random=11" },
      { name: "Pad Thai", price: 13, image: "https://picsum.photos/200/150?random=12" },
      { name: "Egg Noodles with Beef", price: 14, image: "https://picsum.photos/200/150?random=26" },
      { name: "Spring Rolls", price: 6, image: "https://picsum.photos/200/150?random=27" },
      { name: "Udon with Veggies", price: 12, image: "https://picsum.photos/200/150?random=28" }
    ]
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('🌱 Підключено до MongoDB. Оновлюємо дані...');

    await Shop.deleteMany({});
    
    await Shop.insertMany(initialShops);

    console.log('✨ База успішно наповнена! Тепер у тебе 6 магазинів з великим меню.');
    process.exit();
  } catch (error) {
    console.error('❌ Помилка при заповненні бази:', error);
    process.exit(1);
  }
}

seedDB();