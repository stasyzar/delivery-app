import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { Shop } from './models/Shop.js';
import { Order } from './models/Order.js';

const app = express();

// Мідлвари
app.use(cors());
app.use(express.json());

// Підключення до БД
const MONGO_URI = process.env.MONGODB_URI as string;
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ База даних підключена!'))
  .catch(err => console.error('❌ Помилка підключення:', err));

// 1. Отримати всі магазини з товарами для Shops Page
app.get('/api/shops', async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

// 2. Зберегти нове замовлення з Shopping Cart Page
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Замовлення прийнято!" });
  } catch (error) {
    res.status(400).json({ message: "Помилка валідації даних" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер працює на http://localhost:${PORT}`));