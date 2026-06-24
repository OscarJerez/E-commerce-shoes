import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ChatBot from './components/ChatBot';
import { Product } from './data/products';

type Page = 'shop' | 'cart' | 'checkout';

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('shop');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showChat, setShowChat] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>⚽ Adidas Shop Sweden</h1>
          <div className="nav-buttons">
            <button
              onClick={() => setCurrentPage('shop')}
              className={currentPage === 'shop' ? 'active' : ''}
            >
              Butik
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className={currentPage === 'cart' ? 'active' : ''}
            >
              Varukorg ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {currentPage === 'shop' && (
          <ProductList onAddToCart={addToCart} />
        )}
        {currentPage === 'cart' && (
          <Cart
            items={cartItems}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onCheckout={() => setCurrentPage('checkout')}
          />
        )}
        {currentPage === 'checkout' && (
          <Checkout
            cartItems={cartItems}
            onBackToCart={() => setCurrentPage('cart')}
          />
        )}
      </main>

      <button
        className="chat-button"
        onClick={() => setShowChat(!showChat)}
      >
        💬
      </button>

      {showChat && <ChatBot onClose={() => setShowChat(false)} />}

      <footer className="footer">
        <p>&copy; 2024 Adidas Shop Sweden. Officiell återförsäljare.</p>
      </footer>
    </div>
  );
}

export default App;
