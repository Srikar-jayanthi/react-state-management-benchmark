import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  cart: {
    items: [],
    isOpen: false
  },
  user: {
    name: 'Jane Doe',
    isLoggedIn: true
  },
  ui: {
    theme: 'light',
    notification: null
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.items.find(item => item.productId === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.map(item =>
              item.productId === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        };
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, { productId: action.payload.id, name: action.payload.name, quantity: 1, price: action.payload.price }]
        }
      };
    }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: Math.max(0, action.payload.quantity) }
              : item
          ).filter(item => item.quantity > 0)
        }
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(item => item.productId !== action.payload)
        }
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        cart: { ...state.cart, isOpen: !state.cart.isOpen }
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        ui: { ...state.ui, theme: state.ui.theme === 'light' ? 'dark' : 'light' }
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
