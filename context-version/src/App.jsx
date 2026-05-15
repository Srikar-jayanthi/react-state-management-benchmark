import React from 'react';
import { AppProvider, useAppContext } from './AppContext';
import { Header, UserInfo, CartItemCount, ThemeSwitcher } from './components/Header';
import { ProductListPage } from './components/ProductListPage';
import { CartSidebar } from './components/CartComponents';
import { PRODUCTS } from './products';
import './style.css';

const UserInfoContainer = () => {
  const { state } = useAppContext();
  return <UserInfo name={state.user.name} />;
};

const CartItemCountContainer = ({ onToggle }) => {
  const { state } = useAppContext();
  const count = state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
  return <div onClick={onToggle} style={{ cursor: 'pointer' }}><CartItemCount count={count} /></div>;
};

const ThemeSwitcherContainer = () => {
  const { state, dispatch } = useAppContext();
  return <ThemeSwitcher theme={state.ui.theme} onToggle={() => dispatch({ type: 'TOGGLE_THEME' })} />;
};

const ProductListContainer = () => {
  const { dispatch } = useAppContext();
  return <ProductListPage products={PRODUCTS} onAddToCart={(p) => dispatch({ type: 'ADD_TO_CART', payload: p })} />;
};

const CartSidebarContainer = () => {
  const { state, dispatch } = useAppContext();
  return (
    <CartSidebar 
      items={state.cart.items} 
      isOpen={state.cart.isOpen} 
      onClose={() => dispatch({ type: 'TOGGLE_CART' })} 
      onUpdateQuantity={(id, q) => dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, quantity: q } })} 
      onRemove={(id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })} 
    />
  );
};

function AppContent() {
  const { state, dispatch } = useAppContext();

  return (
    <div className={state.ui.theme}>
      <Header>
        <UserInfoContainer />
        <ThemeSwitcherContainer />
        <CartItemCountContainer onToggle={() => dispatch({ type: 'TOGGLE_CART' })} />
      </Header>
      <main>
        <ProductListContainer />
      </main>
      <CartSidebarContainer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
