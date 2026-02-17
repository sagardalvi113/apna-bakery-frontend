
import { create } from 'zustand'

export const useCart = create((set, get) => ({
  cart: [],
  add: (product) => {
    const cur = get().cart
    const idx = cur.findIndex(ci => ci.product.id === product.id)
    if (idx >= 0) {
      const copy = [...cur]
      copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
      set({ cart: copy })
    } else {
      set({ cart: [...cur, { product, quantity: 1 }] })
    }
  },
  remove: (id) => set({ cart: get().cart.filter(ci => ci.product.id !== id) }),
  clear: () => set({ cart: [] })
}))
