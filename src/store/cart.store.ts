import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MenuItem } from '../types';

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartState {
  items: OrderItem[];
  addItem: (menuItem: MenuItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      items: [],

      addItem: menuItem =>
        set(state => {
          const currentItems = [...state.items];
          const existingItemIndex = currentItems.findIndex(
            item => item.menuItem.id === menuItem.id
          );

          if (existingItemIndex >= 0) {
            currentItems[existingItemIndex] = {
              ...currentItems[existingItemIndex],
              quantity: currentItems[existingItemIndex].quantity + 1
            };
          } else {
            currentItems.push({ menuItem, quantity: 1 });
          }

          return { items: currentItems };
        }),

      removeItem: id =>
        set(state => ({
          items: state.items.filter(item => item.menuItem.id !== id)
        })),

      updateQuantity: (id, quantity) =>
        set(state => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(item => item.menuItem.id !== id)
            };
          }

          return {
            items: state.items.map(item =>
              item.menuItem.id === id ? { ...item, quantity } : item
            )
          };
        }),

      resetStore: () => set({ items: [] })
    }),
    { name: 'cart-storage' }
  )
);
