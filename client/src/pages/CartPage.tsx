import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../CartContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+380\d{9}$/; 

  if (!formData.name.trim() || formData.name.length < 2) {
    alert("Будь ласка, введіть коректне ім'я (мінімум 2 символи).");
    return;
  }

  if (!emailRegex.test(formData.email)) {
    alert("Введіть правильну e-mail адресу (наприклад, user@mail.com).");
    return;
  }

  if (!phoneRegex.test(formData.phone)) {
    alert("Номер телефону має бути у форматі +380XXXXXXXXX (12 цифр).");
    return;
  }

  if (!formData.address.trim() || formData.address.length < 5) {
    alert("Будь ласка, вкажіть повну адресу доставки.");
    return;
  }

  const order = {
    customer: formData,
    items: cart,
    totalPrice: totalPrice
  };

  try {
    const response = await axios.post('https://delivery-app-3mdo.onrender.com/api/orders', order);
    alert(response.data.message);
    clearCart();
    setFormData({ name: '', email: '', phone: '', address: '' });
  } catch (error) {
    console.error("Помилка при відправці:", error);
    alert("Виникла помилка при оформленні замовлення.");
  }
};

  return (
    <div className="cart-page">
      <form className="order-form" onSubmit={handleSubmit}>
        {}
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

        {}
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