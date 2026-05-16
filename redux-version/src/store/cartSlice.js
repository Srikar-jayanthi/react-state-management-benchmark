import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      if (!action.payload || !action.payload.id) return;
      
      const existingItem = state.items.find(item => item.productId === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          productId: action.payload.id, 
          name: action.payload.name, 
          quantity: 1, 
          price: action.payload.price 
        });
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (!productId) return;
      
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.productId !== productId);
        }
      }
    },
    removeFromCart: (state, action) => {
      if (!action.payload) return;
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
