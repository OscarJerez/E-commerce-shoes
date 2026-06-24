import React, { useState } from 'react';
import { products, Product } from '../data/products';
import './ProductList.css';

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState<'all' | 'adidas' | 'football'>('all');
  const itemsPerPage = 10;

  const filtered = category === 'all'
    ? products
    : products.filter((p) => p.category === category);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="product-list-container">
      <div className="filter-section">
        <h2>Kategori</h2>
        <div className="filter-buttons">
          <button
            onClick={() => { setCategory('all'); setCurrentPage(0); }}
            className={category === 'all' ? 'active' : ''}
          >
            Alla produkter ({products.length})
          </button>
          <button
            onClick={() => { setCategory('adidas'); setCurrentPage(0); }}
            className={category === 'adidas' ? 'active' : ''}
          >
            Adidas Skor ({products.filter(p => p.category === 'adidas').length})
          </button>
          <button
            onClick={() => { setCategory('football'); setCurrentPage(0); }}
            className={category === 'football' ? 'active' : ''}
          >
            Fotbollsskor ({products.filter(p => p.category === 'football').length})
          </button>
        </div>
      </div>

      <div className="products-grid">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <span className="rating">★ {product.rating}</span>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="model">{product.model}</p>
              <p className="description">{product.description}</p>
              <div className="product-footer">
                <span className="price">{product.price} kr</span>
                <span className={`stock ${product.stock < 10 ? 'low' : ''}`}>
                  Lager: {product.stock}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                className="add-to-cart-btn"
              >
                Lägg i varukorg
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          ← Förra
        </button>
        <span>Sida {currentPage + 1} av {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Nästa →
        </button>
      </div>
    </div>
  );
};

export default ProductList;
