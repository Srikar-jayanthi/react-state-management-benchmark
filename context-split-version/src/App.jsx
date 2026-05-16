import React, { memo } from 'react';
import { CartProvider, useCartContext, CART_ACTIONS } from './CartContext';
import { UserProvider, useUserContext } from './UserContext';
import { UIProvider, useUIContext, UI_ACTIONS } from './UIContext';
import { Header, UserInfo, CartItemCount, ThemeSwitcher } from './components/Header';
import { ProductListPage } from './components/ProductListPage';
import { CartSidebar } from './components/CartComponents';
import { PRODUCTS } from './products';
import './style.css';

const UserInfoContainer = memo(() => {
  const { state } = useUserContext();
  return <UserInfo name={state.name} />;
});

const CartItemCountContainer = memo(() => {
  const { state, dispatch } = useCartContext();
  const count = state.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div onClick={() => dispatch({ type: CART_ACTIONS.TOGGLE_CART })} style={{ cursor: 'pointer' }}>
      <CartItemCount count={count} />
    </div>
  );
});

const ThemeSwitcherContainer = memo(() => {
  const { state, dispatch } = useUIContext();
  return <ThemeSwitcher theme={state.theme} onToggle={() => dispatch({ type: UI_ACTIONS.TOGGLE_THEME })} />;
});

const ProductListContainer = memo(() => {
  const { dispatch } = useCartContext();
  return <ProductListPage products={PRODUCTS} onAddToCart={(p) => dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: p })} />;
});

const CartSidebarContainer = memo(() => {
  const { state, dispatch } = useCartContext();
  return (
    <CartSidebar 
      items={state.items} 
      isOpen={state.isOpen} 
      onClose={() => dispatch({ type: CART_ACTIONS.TOGGLE_CART })} 
      onUpdateQuantity={(id, q) => dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { productId: id, quantity: q } })} 
      onRemove={(id) => dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: id })} 
    />
  );
});

const AppContent = () => {
  const { state } = useUIContext();
  
  return (
    <div className={state.theme}>
      <Header>
        <UserInfoContainer />
        <ThemeSwitcherContainer />
        <CartItemCountContainer />
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
    <UserProvider>
      <UIProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UIProvider>
    </UserProvider>
  );
}

export default App;
