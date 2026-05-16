import React, { memo } from 'react';
import { RenderCount } from './RenderCount';

export const CartItem = memo(({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div>
        <h4>{item.name} <RenderCount /></h4>
        <p>${item.price} x {item.quantity}</p>
      </div>
      <div className="cart-item-actions">
        <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}>-</button>
        <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
        <button onClick={() => onRemove(item.productId)}>Remove</button>
      </div>
    </div>
  );
});

export const CartSidebar = memo(({ items, isOpen, onClose, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <h2>Your Cart <RenderCount /></h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="cart-items">
        {items.length === 0 ? <p>Cart is empty</p> : items.map(item => (
          <CartItem 
            key={item.productId} 
            item={item} 
            onUpdateQuantity={onUpdateQuantity} 
            onRemove={onRemove} 
          />
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button disabled={items.length === 0}>Checkout</button>
      </div>
    </div>
  );
});
