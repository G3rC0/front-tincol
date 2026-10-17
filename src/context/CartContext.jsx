/**
 * CartContext — Tienda Colmena
 * El carrito se persiste en localStorage para no perderse al navegar.
 * Cada ítem es único por combinación (id + talla).
 */

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('colmena_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Sincronizar carrito con localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('colmena_cart', JSON.stringify(items))
  }, [items])

  /**
   * Añade un producto al carrito.
   * Si ya existe (misma id + misma talla), suma la cantidad.
   */
  const addItem = (product, size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      // Guardamos solo los campos necesarios para renderizar el carrito
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],  // solo la primera imagen
          size,
          quantity,
        },
      ]
    })
  }

  /** Elimina un ítem por id + talla */
  const removeItem = (productId, size) => {
    setItems((prev) => prev.filter((i) => !(i.id === productId && i.size === size)))
  }

  /** Cambia la cantidad. Si llega a 0, lo elimina. */
  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) { removeItem(productId, size); return }
    setItems((prev) =>
      prev.map((i) =>
        i.id === productId && i.size === size ? { ...i, quantity } : i
      )
    )
  }

  const clearCart = () => setItems([])

  // Derivados
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal  = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
