import React from 'react';

const CartPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '30px', padding: '20px' }}>
      
      {/* Ліва частина: Форма даних клієнта (згідно з ТЗ) */}
      <div style={{ 
        flex: 1, 
        border: '1px solid #ccc', 
        padding: '20px', 
        borderRadius: '8px' 
      }}>
        <h3>User Data:</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input type="text" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input type="email" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Phone:</label>
          <input type="tel" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Address:</label>
          <input type="text" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
      </div>

      {/* Права частина: Список товарів у кошику */}
      <div style={{ 
        flex: 1.5, 
        border: '1px solid #ccc', 
        padding: '20px', 
        borderRadius: '8px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div className="cart-items-list">
          <p style={{ textAlign: 'center', color: '#888' }}>Your cart is empty</p>
          {/* Тут будуть картки обраних товарів */}
        </div>

        <div style={{ textAlign: 'right', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <h4>Total price: 0</h4>
          <button style={{ 
            padding: '10px 30px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Submit
          </button>
        </div>
      </div>

    </div>
  );
};

export default CartPage;