import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { type Product } from './types';

// Розширюємо стандартний продукт полем для кількості
interface CartItem extends Product {
  quantity: number;
}

// Описуємо "контракт" нашого контексту для TypeScript
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, amount: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Ініціалізуємо кошик даними з localStorage, щоб нічого не зникало при оновленні
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Щоразу, коли кошик змінюється, записуємо його в пам'ять браузера
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Додавання товару: якщо вже є — збільшуємо кількість, якщо ні — додаємо новий
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Зміна кількості (+1 або -1), але не менше одиниці
  const updateQuantity = (id: string, amount: number) => {
    setCart(prev => prev.map(item => 
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  // Видалення конкретного товару
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  // Повне очищення кошика (використовуємо після успішного замовлення)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Розрахунок загальної вартості
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для зручного використання в компонентах
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};