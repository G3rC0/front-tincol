import { useState } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

/**
 * SizePickerModal
 * Permite seleccionar talla antes de añadir al carrito (desde ProductCard).
 * @param {object}   product  - el producto a añadir
 * @param {function} onClose  - cierra el modal
 * @param {function} onAdded  - callback después de añadir (para mostrar toast)
 */
export default function SizePickerModal({ product, onClose, onAdded }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const { addItem } = useCart()

  const handleAdd = () => {
    if (!selectedSize) return
    addItem(product, selectedSize)
    onAdded?.()
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Selecciona una talla
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              {product.name}
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', marginTop: '6px' }}>
              Bs. {product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', flexShrink: 0,
              border: '2px solid var(--border-color)', borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface-alt)', cursor: 'pointer', marginLeft: '12px',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Selector de tallas */}
        <div className="size-chips" style={{ marginBottom: '20px' }}>
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`size-chip ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {!selectedSize && (
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            👆 Elige una talla para continuar
          </p>
        )}

        {/* Acción */}
        <button
          className="btn btn-primary btn-full btn-lg"
          onClick={handleAdd}
          disabled={!selectedSize}
        >
          <ShoppingCart size={18} />
          {selectedSize ? `Añadir talla ${selectedSize}` : 'Selecciona una talla'}
        </button>
      </div>
    </div>
  )
}
