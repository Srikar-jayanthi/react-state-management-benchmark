import React, { memo } from 'react';
import { RenderCount } from './RenderCount';

export const ProductCard = memo(({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image" style={{ backgroundColor: '#eee', height: '150px', borderRadius: '8px' }}></div>
      <h3>{product.name} <RenderCount /></h3>
      <p className="price">${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
});
