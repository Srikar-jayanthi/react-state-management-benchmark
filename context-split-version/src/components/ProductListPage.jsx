import React, { memo } from 'react';
import { ProductCard } from './ProductCard';
import { RenderCount } from './RenderCount';

export const ProductListPage = memo(({ products, onAddToCart }) => {
  return (
    <div className="product-list-page">
      <h2>Products <RenderCount /></h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
});
