import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

// Costo de envío simulado — 0 si supera Bs. 150
const SHIPPING_THRESHOLD = 150
const SHIPPING_COST      = 15

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total    = subtotal + shipping

  /* ── Estado vacío ── */
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="section-title cart-heading">Mi carrito</h1>
          <div className="cart-empty">
            <div className="cart-empty-icon"><ShoppingBag size={64} strokeWidth={1.5} /></div>
            <h2 className="cart-empty-title">Tu carrito está vacío</h2>
            <p className="cart-empty-desc">¡Agrega algo desde el catálogo y vuelve aquí!</p>
            <Link to="/catalogo" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} /> Explorar catálogo
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── Carrito con ítems ── */
  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h1 className="section-title">
            Mi carrito
            <span className="cart-count-pill">
              {itemCount} ítem{itemCount !== 1 ? 's' : ''}
            </span>
          </h1>
        </div>

        {/* Layout: items + resumen */}
        <div className="cart-layout">
          {/* ── Lista de ítems ── */}
          <div className="cart-items">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item-card">
                {/* Imagen */}
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Info + controles */}
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-meta">
                    Talla: <strong>{item.size}</strong>
                    {' · '}
                    {formatPrice(item.price)} c/u
                  </p>

                  {/* Controles de cantidad */}
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-actions">
                      <span className="cart-item-subtotal">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeItem(item.id, item.size)}
                        title="Eliminar del carrito"
                        aria-label="Eliminar ítem"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Link volver */}
            <Link to="/catalogo" className="btn btn-white btn-sm cart-back-link">
              <ArrowLeft size={15} /> Seguir comprando
            </Link>
          </div>

          {/* ── Resumen de orden ── */}
          <div className="cart-summary-box">
            <h2 className="cart-summary-title">Resumen de orden</h2>

            <div className="cart-summary-row">
              <span>Subtotal ({itemCount} ítem{itemCount !== 1 ? 's' : ''})</span>
              <span className="mono-bold">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="cart-summary-row">
              <span>Envío</span>
              <span className="mono-bold">
                {shipping === 0
                  ? <span className="text-success">Gratis</span>
                  : formatPrice(SHIPPING_COST)
                }
              </span>
            </div>

            {/* Aviso envío gratis */}
            {shipping > 0 && (
              <div className="cart-shipping-note">
                <Truck size={16} /> Añade {formatPrice(SHIPPING_THRESHOLD - subtotal)} más para envío gratis
              </div>
            )}

            <div className="cart-summary-row total">
              <span>Total</span>
              <span className="text-mono">{formatPrice(total)}</span>
            </div>

            {/* Checkout (placeholder — conectar al flujo de pago) */}
            <button
              className="btn btn-primary btn-full btn-lg cart-checkout-btn"
              onClick={() => alert('Próximamente: integración de pago')}
            >
              Proceder al pago <ArrowRight size={18} />
            </button>

            <p className="cart-secure-note">
              Pago seguro · Devoluciones sin costo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
