import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Modal from './ui/Modal'
import Button from './ui/Button'
import { formatPrice } from '../utils/formatPrice'

/**
 * SizePickerModal
 * @param {object}   product
 * @param {function} onClose
 * @param {function} onAdded - callback después de añadir
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

  return (
    <Modal onClose={onClose} eyebrow="Selecciona una talla" title={product.name}>
      <p className="modal-price">{formatPrice(product.price)}</p>

        <div className="size-chips size-chips--spaced">
        {product.sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`size-chip ${selectedSize === size ? 'selected' : ''}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {!selectedSize && <p className="modal-hint">Elige una talla para continuar</p>}

      <Button size="lg" full onClick={handleAdd} disabled={!selectedSize}>
        <ShoppingCart size={18} />
        {selectedSize ? `Añadir talla ${selectedSize}` : 'Selecciona una talla'}
      </Button>
    </Modal>
  )
}