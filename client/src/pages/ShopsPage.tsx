import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { type Shop } from '../types';

const ShopsPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  // 1. Отримуємо дані з сервера при завантаженні сторінки
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shops');
        setShops(response.data);
        // За замовчуванням вибираємо перший магазин
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
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Ліва панель: Список магазинів */}
      <div style={{ 
        width: '250px', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        padding: '15px' 
      }}>
        <h3 style={{ textAlign: 'center' }}>Shops:</h3>
        {shops.map(shop => (
          <button
            key={shop._id}
            onClick={() => setSelectedShop(shop)}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              cursor: 'pointer',
              backgroundColor: selectedShop?._id === shop._id ? '#e0e0e0' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            {shop.name}
          </button>
        ))}
      </div>

      {/* Права панель: Товари обраного магазину */}
      <div style={{ 
        flex: 1, 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        minHeight: '400px'
      }}>
        {selectedShop ? (
          selectedShop.products.map(product => (
            <div key={product._id} style={{ 
              border: '1px solid #eee', 
              padding: '10px', 
              textAlign: 'center',
              borderRadius: '8px'
            }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '4px' }} />
              <h4>{product.name}</h4>
              <p>Price: ${product.price}</p>
              <button 
                onClick={() => alert(`Added ${product.name} to cart!`)}
                style={{ padding: '5px 15px', cursor: 'pointer' }}
              >
                add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Select a shop to see products</p>
        )}
      </div>
    </div>
  );
};

export default ShopsPage;