import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { type Shop } from '../types';
import { useCart } from '../CartContext';
import './ShopsPage.css'; // Імпортуємо майбутній файл стилів

const ShopsPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shops');
        setShops(response.data);
        if (response.data.length > 0) {
          setSelectedShop(response.data[0]);
        }
      } catch (error) {
        console.error("Помилка при завантаженні магазинів:", error);
      }
    };
    fetchShops();
  }, []);

  return (
    <div className="shops-container">
      {/* Ліва панель: Список магазинів */}
      <aside className="sidebar">
        <h3 className="sidebar-title">Shops:</h3>
        <div className="shops-list">
          {shops.map(shop => (
            <button
              key={shop._id}
              onClick={() => setSelectedShop(shop)}
              className={`shop-button ${selectedShop?._id === shop._id ? 'active' : ''}`}
            >
              {shop.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Права панель: Товари обраного магазину */}
      <section className="product-grid">
        {selectedShop ? (
          selectedShop.products.map(product => (
            <div key={product._id} className="product-card">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image" 
              />
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">Price: ${product.price}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-selection">
            <p>Select a shop to see products</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ShopsPage;