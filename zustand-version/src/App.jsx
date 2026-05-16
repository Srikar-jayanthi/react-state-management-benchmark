import React, { memo } from 'react';
import { useAppStore } from './store/useAppStore';
import { Header, UserInfo, CartItemCount, ThemeSwitcher } from './components/Header';
import { ProductListPage } from './components/ProductListPage';
import { CartSidebar } from './components/CartComponents';
import { PRODUCTS } from './products';
import './style.css';

const UserInfoContainer = memo(() => {
  const name = useAppStore(state => state.user.name);
  return <UserInfo name={name} />;
});

const CartItemCountContainer = memo(({ onToggle }) => {
  const count = useAppStore(state => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));
  return <div onClick={onToggle} style={{ cursor: 'pointer' }}><CartItemCount count={count} /></div>;
});

const ThemeSwitcherContainer = memo(() => {
  const theme = useAppStore(state => state.ui.theme);
  const toggleTheme = useAppStore(state => state.toggleTheme);
  return <ThemeSwitcher theme={theme} onToggle={toggleTheme} />;
});

const ProductListContainer = memo(() => {
  const addToCart = useAppStore(state => state.addToCart);
  return <ProductListPage products={PRODUCTS} onAddToCart={addToCart} />;
});

const CartSidebarContainer = memo(() => {
  const items = useAppStore(state => state.cart.items);
  const isOpen = useAppStore(state => state.cart.isOpen);
  const toggleCart = useAppStore(state => state.toggleCart);
  const updateQuantity = useAppStore(state => state.updateQuantity);
  const removeFromCart = useAppStore(state => state.removeFromCart);

  return (
    <CartSidebar 
      items={items} 
      isOpen={isOpen} 
      onClose={toggleCart} 
      onUpdateQuantity={updateQuantity} 
      onRemove={removeFromCart} 
    />
  );
});

function App() {
  const theme = useAppStore(state => state.ui.theme);
  const toggleCart = useAppStore(state => state.toggleCart);

  return (
    <div className={theme}>
      <Header>
        <UserInfoContainer />
        <ThemeSwitcherContainer />
        <CartItemCountContainer onToggle={toggleCart} />
      </Header>
      <main>
        <ProductListContainer />
      </main>
      <CartSidebarContainer />
    </div>
  );
}

export default App;
