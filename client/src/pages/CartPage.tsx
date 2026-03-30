import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext';
import './CartPage.css'; // Імпортуємо файл стилів, який створимо наступним кроком

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Використовуємо атрибут name інпуту для оновлення стану
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Базова валідація згідно з вимогами проекту
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Будь ласка, заповніть всі поля форми!");
      return;
    }

    const order = {
      customer: formData,
      items: cart,
      totalPrice: totalPrice
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders', order);
      alert(response.data.message);
      clearCart(); // Очищуємо кошик після успішного замовлення
      setFormData({ name: '', email: '', phone: '', address: '' }); // Очищуємо форму
    } catch (error) {
      console.error("Помилка при відправці:", error);
      alert("Виникла помилка при оформленні замовлення.");
    }
  };

  return (
    <div className="cart-page">
      <form className="order-form" onSubmit={handleSubmit}>
        {/* Ліва частина: Дані користувача */}
        <section className="user-info">
          <h3>Contact Information:</h3>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+380..." />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Your delivery address" />
          </div>
        </section>

        {/* Права частина: Список товарів */}
        <section className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart-message">Your shopping cart is empty</div>
          ) : (
            <div className="items-list">
              {cart.map(item => (
                <div key={item._id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">Price: ${item.price}</p>
                    <div className="quantity-controls">
                      <button type="button" onClick={() => updateQuantity(item._id, -1)}>-</button>
                      <span className="quantity-count">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item._id, 1)}>+</button>
                      <button type="button" className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cart-footer">
            <h3 className="total-sum">Total price: ${totalPrice}</h3>
            <button type="submit" className="submit-order-btn" disabled={cart.length === 0}>
              Submit Order
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CartPage;