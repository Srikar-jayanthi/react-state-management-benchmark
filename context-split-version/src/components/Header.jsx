import React from 'react';
import { RenderCount } from './RenderCount';

export const UserInfo = ({ name }) => (
  <div className="user-info">
    <span>Welcome, {name}</span>
    <RenderCount />
  </div>
);

export const CartItemCount = ({ count }) => (
  <div className="cart-item-count">
    <span>Cart ({count})</span>
    <RenderCount />
  </div>
);

export const ThemeSwitcher = ({ theme, onToggle }) => (
  <button onClick={onToggle}>
    Theme: {theme}
    <RenderCount />
  </button>
);

export const Header = ({ children }) => {
  return (
    <header className="header">
      <h1>ShopApp <RenderCount /></h1>
      <div className="header-actions">
        {children}
      </div>
    </header>
  );
};
