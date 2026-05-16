import { create } from 'zustand';

export const useAppStore = create((set) => ({
  cart: {
    items: [],
    isOpen: false,
  },
  user: {
    name: 'Jane Doe',
    isLoggedIn: true,
  },
  ui: {
    theme: 'light',
    notification: null,
  },
  
  addToCart: (product) => {
    if (!product || !product.id) return;
    
    set((state) => {
      const existingItem = state.cart.items.find(item => item.productId === product.id);
      if (existingItem) {
        return {
          cart: {
            ...state.cart,
            items: state.cart.items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        };
      }
      return {
        cart: {
          ...state.cart,
          items: [...state.cart.items, { productId: product.id, name: product.name, quantity: 1, price: product.price }]
        }
      };
    });
  },

  updateQuantity: (productId, quantity) => {
    if (!productId) return;
    
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }
    }));
  },

  removeFromCart: (productId) => {
    if (!productId) return;
    
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter(item => item.productId !== productId)
      }
    }));
  },

  toggleCart: () => set((state) => ({
    cart: { ...state.cart, isOpen: !state.cart.isOpen }
  })),

  toggleTheme: () => set((state) => ({
    ui: { ...state.ui, theme: state.ui.theme === 'light' ? 'dark' : 'light' }
  }))
}));
