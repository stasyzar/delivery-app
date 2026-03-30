import mongoose from 'mongoose';
import 'dotenv/config';
import { Shop } from './models/Shop.js';

const initialShops = [
  {
    name: "Mc Donny",
    rating: 5.0,
    products: [
      { name: "Big Big Burger", category: "Burgers", price: 15, image: "https://picsum.photos/200/150?random=1" },
      { name: "Small Big Burger", category: "Burgers",price: 10, image: "https://picsum.photos/200/150?random=2" },
      { name: "Cheese Master", category: "Burgers",price: 12, image: "https://picsum.photos/200/150?random=13" },
      { name: "French Fries", category: "Sides",price: 5, image: "https://picsum.photos/200/150?random=14" },
      { name: "Vanilla Milkshake", category: "Burgers",price: 8, image: "https://picsum.photos/200/150?random=20" }
    ]
  },
  {
    name: "CFK",
    rating: 4.5,
    products: [
      { name: "Chicken Wings", category: "Sides",price: 14, image: "https://picsum.photos/200/150?random=3" },
      { name: "Hot Bucket", category: "Sides",price: 22, image: "https://picsum.photos/200/150?random=4" },
      { name: "Zinger Burger", category: "Burgers",price: 13, image: "https://picsum.photos/200/150?random=21" },
      { name: "Chicken Strips", category: "Sides",price: 11, image: "https://picsum.photos/200/150?random=22" }
    ]
  },
  {
    name: "Pizza Port",
    rating: 4.0,
    products: [
      { name: "Pepperoni Pizza", category: "Pizzas",price: 18, image: "https://picsum.photos/200/150?random=5" },
      { name: "Margarita Pizza", category: "Pizzas",price: 16, image: "https://picsum.photos/200/150?random=6" },
      { name: "Four Cheese", category: "Pizzas",price: 20, image: "https://picsum.photos/200/150?random=18" },
      { name: "BBQ Chicken", category: "Pizzas",price: 19, image: "https://picsum.photos/200/150?random=19" },
      { name: "Hawaiian Pizza", category: "Pizzas",price: 17, image: "https://picsum.photos/200/150?random=23" }
    ]
  },
  {
    name: "Sushi Master",
    rating: 3.5,
    products: [
      { name: "California Roll", category: "Rolls",price: 12, image: "https://picsum.photos/200/150?random=7" },
      { name: "Philadelphia Roll", category: "Rolls",price: 14, image: "https://picsum.photos/200/150?random=8" },
      { name: "Dragon Roll", category: "Rolls",price: 18, image: "https://picsum.photos/200/150?random=15" },
      { name: "Miso Soup", category: "Soups",price: 7, image: "https://picsum.photos/200/150?random=16" },
      { name: "Tempura Shrimp", category: "Soups",price: 11, image: "https://picsum.photos/200/150?random=17" }
    ]
  },
  {
    name: "Salad Bar",
    rating: 2.5,
    products: [
      { name: "Caesar Salad", category: "Salads",price: 9, image: "https://picsum.photos/200/150?random=9" },
      { name: "Greek Salad", category: "Salads",price: 8, image: "https://picsum.photos/200/150?random=10" },
      { name: "Tuna Salad", category: "Salads",price: 11, image: "https://picsum.photos/200/150?random=24" },
      { name: "Fruit Salad", category: "Salads",price: 7, image: "https://picsum.photos/200/150?random=25" }
    ]
  },
  {
    name: "Wok & Go",
    rating: 4.0,
    products: [
      { name: "Rice with Chicken", category: "Sides",price: 11, image: "https://picsum.photos/200/150?random=11" },
      { name: "Pad Thai", category: "Sides",price: 13, image: "https://picsum.photos/200/150?random=12" },
      { name: "Egg Noodles with Beef", category: "Sides", price: 14, image: "https://picsum.photos/200/150?random=26" },
      { name: "Spring Rolls", category: "Rolls", price: 6, image: "https://picsum.photos/200/150?random=27" },
      { name: "Udon with Veggies", category: "Soups", price: 12, image: "https://picsum.photos/200/150?random=28" }
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