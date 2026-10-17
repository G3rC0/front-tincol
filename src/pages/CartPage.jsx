import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

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
          <h1 className="section-title" style={{ marginBottom: '32px' }}>
            Mi carrito 🛒
          </h1>
          <div className="cart-empty" style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🛒</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '8px' }}>
              Tu carrito está vacío
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>
              ¡Agrega algo desde el catálogo y vuelve aquí!
            </p>
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
        <div className="section-header" style={{ marginBottom: '24px' }}>
          <h1 className="section-title">
            Mi carrito
            <span
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
                background: 'var(--primary)', border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-pill)', padding: '2px 10px',
                marginLeft: '10px', fontWeight: 700,
              }}
            >
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
                    Bs. {item.price.toFixed(2)} c/u
                  </p>

                  {/* Controles de cantidad */}
                  <div
                    style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', marginTop: 'auto', flexWrap: 'wrap', gap: '8px',
                    }}
                  >
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="cart-item-subtotal">
                        Bs. {(item.price * item.quantity).toFixed(2)}
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
            <Link
              to="/catalogo"
              className="btn btn-white btn-sm"
              style={{ display: 'inline-flex', marginTop: '8px' }}
            >
              <ArrowLeft size={15} /> Seguir comprando
            </Link>
          </div>

          {/* ── Resumen de orden ── */}
          <div className="cart-summary-box">
            <h2 className="cart-summary-title">Resumen de orden</h2>

            <div className="cart-summary-row">
              <span>Subtotal ({itemCount} ítem{itemCount !== 1 ? 's' : ''})</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                Bs. {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="cart-summary-row">
              <span>Envío</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {shipping === 0
                  ? <span style={{ color: '#0a5c1b' }}>Gratis 🎉</span>
                  : `Bs. ${SHIPPING_COST.toFixed(2)}`
                }
              </span>
            </div>

            {/* Aviso envío gratis */}
            {shipping > 0 && (
              <div
                style={{
                  padding: '10px 12px', marginBottom: '4px',
                  background: '#FFFBEB',
                  border: '2px solid var(--primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem', fontWeight: 600,
                }}
              >
                🚚 Añade Bs. {(SHIPPING_THRESHOLD - subtotal).toFixed(2)} más para envío gratis
              </div>
            )}

            <div className="cart-summary-row total">
              <span>Total</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>Bs. {total.toFixed(2)}</span>
            </div>

            {/* Checkout (placeholder — conectar al flujo de pago) */}
            <button
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: '20px' }}
              onClick={() => alert('🚀 Próximamente: integración de pago')}
            >
              Proceder al pago <ArrowRight size={18} />
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px' }}>
              🔒 Pago seguro · Devoluciones sin costo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
