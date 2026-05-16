import React, { memo } from 'react';
import { RenderCount } from './RenderCount';

export const UserInfo = memo(({ name }) => (
  <div className="user-info">
    <span>Welcome, {name}</span>
    <RenderCount />
  </div>
));

export const CartItemCount = memo(({ count }) => (
  <div className="cart-item-count">
    <span>Cart ({count})</span>
    <RenderCount />
  </div>
));

export const ThemeSwitcher = memo(({ theme, onToggle }) => (
  <button onClick={onToggle}>
    Theme: {theme}
    <RenderCount />
  </button>
));

export const Header = memo(({ children }) => {
  return (
    <header className="header">
      <h1>ShopApp <RenderCount /></h1>
      <div className="header-actions">
        {children}
      </div>
    </header>
  );
});
