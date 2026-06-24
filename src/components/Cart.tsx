import React from 'react';
import { Product } from '../data/products';
import './Cart.css';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <p>Din varukorg är tom</p>
          <p className="empty-cart-icon">🛒</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Din Varukorg</h2>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-model">{item.model}</p>
              <p className="item-price">{item.price} kr</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
              />
              <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="item-total">
              {item.price * item.quantity} kr
            </div>
            <button
              className="remove-btn"
              onClick={() => onRemove(item.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Summa:</span>
          <span>{subtotal} kr</span>
        </div>
        <div className="summary-note">
          Frakt läggs till i kassan
        </div>
        <button className="checkout-btn" onClick={onCheckout}>
          Gå till kassan →
        </button>
      </div>
    </div>
  );
};

export default Cart;
