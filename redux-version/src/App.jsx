import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart, toggleCart } from './store/cartSlice';
import { toggleTheme } from './store/uiSlice';
import { Header, UserInfo, CartItemCount, ThemeSwitcher } from './components/Header';
import { ProductListPage } from './components/ProductListPage';
import { CartSidebar } from './components/CartComponents';
import { PRODUCTS } from './products';
import './style.css';

const UserInfoContainer = memo(() => {
  const name = useSelector(state => state.user.name);
  return <UserInfo name={name} />;
});

const CartItemCountContainer = memo(({ onToggle }) => {
  const count = useSelector(state => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));
  return <div onClick={onToggle} style={{ cursor: 'pointer' }}><CartItemCount count={count} /></div>;
});

const ThemeSwitcherContainer = memo(() => {
  const theme = useSelector(state => state.ui.theme);
  const dispatch = useDispatch();
  return <ThemeSwitcher theme={theme} onToggle={() => dispatch(toggleTheme())} />;
});

const ProductListContainer = memo(() => {
  const dispatch = useDispatch();
  return <ProductListPage products={PRODUCTS} onAddToCart={(p) => dispatch(addToCart(p))} />;
});

const CartSidebarContainer = memo(() => {
  const items = useSelector(state => state.cart.items);
  const isOpen = useSelector(state => state.cart.isOpen);
  const dispatch = useDispatch();

  return (
    <CartSidebar 
      items={items} 
      isOpen={isOpen} 
      onClose={() => dispatch(toggleCart())} 
      onUpdateQuantity={(id, q) => dispatch(updateQuantity({ productId: id, quantity: q }))} 
      onRemove={(id) => dispatch(removeFromCart(id))} 
    />
  );
});

function App() {
  const theme = useSelector(state => state.ui.theme);
  const dispatch = useDispatch();

  return (
    <div className={theme}>
      <Header>
        <UserInfoContainer />
        <ThemeSwitcherContainer />
        <CartItemCountContainer onToggle={() => dispatch(toggleCart())} />
      </Header>
      <main>
        <ProductListContainer />
      </main>
      <CartSidebarContainer />
    </div>
  );
}

export default App;
