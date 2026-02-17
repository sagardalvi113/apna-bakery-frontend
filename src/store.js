
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
  increase: (productId) => {
    const cur = get().cart
    const idx = cur.findIndex(ci => ci.product.id === productId)
    if (idx >= 0) {
      const copy = [...cur]
      copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
      set({ cart: copy })
    }
  },
  decrease: (productId) => {
    const cur = get().cart
    const idx = cur.findIndex(ci => ci.product.id === productId)
    if (idx >= 0) {
      const copy = [...cur]
      const newQty = copy[idx].quantity - 1
      if (newQty <= 0) {
        // remove item when quantity reaches 0
        copy.splice(idx, 1)
      } else {
        copy[idx] = { ...copy[idx], quantity: newQty }
      }
      set({ cart: copy })
    }
  },
  setQuantity: (productId, qty) => {
    if (qty <= 0) return get().remove(productId)
    const cur = get().cart
    const idx = cur.findIndex(ci => ci.product.id === productId)
    if (idx >= 0) {
      const copy = [...cur]
      copy[idx] = { ...copy[idx], quantity: qty }
      set({ cart: copy })
    }
  },
  remove: (id) => set({ cart: get().cart.filter(ci => ci.product.id !== id) }),
  clear: () => set({ cart: [] })
}))
