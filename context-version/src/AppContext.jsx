import React, { createContext, useReducer, useContext, useMemo } from 'react';

export const APP_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  TOGGLE_THEME: 'TOGGLE_THEME'
};

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
    case APP_ACTIONS.ADD_TO_CART: {
      if (!action.payload || !action.payload.id) return state;
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
    case APP_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (!productId) return state;
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter(item => item.quantity > 0)
        }
      };
    }
    case APP_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(item => item.productId !== action.payload)
        }
      };
    case APP_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        cart: { ...state.cart, isOpen: !state.cart.isOpen }
      };
    case APP_ACTIONS.TOGGLE_THEME:
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
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
