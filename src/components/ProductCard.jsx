import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Info, CheckCircle2 } from 'lucide-react'
import AuthModal from './AuthModal'
import SizePickerModal from './SizePickerModal'
import Badge from './ui/Badge'
import Toast from './ui/Toast'
import { formatPrice } from '../utils/formatPrice'
import { useToast } from '../hooks/useToast'
import { useRequireAuth } from '../hooks/useRequireAuth'

export default function ProductCard({ product, onAddedToCart }) {
  const { requireAuth, showAuthModal, closeAuthModal } = useRequireAuth()
  const [showSizePicker, setShowSizePicker]   = useState(false)
  const toast = useToast()
  const [showDescription, setShowDescription] = useState(false)

  const handleAddToCart = () => requireAuth(() => setShowSizePicker(true))

  const handleAdded = () => {
    if (onAddedToCart) {
      onAddedToCart(product.name)   // catálogo: lo muestra el padre
      return
    }
    toast.show()                    // home: lo muestra la propia tarjeta
  }


  return (
    <>
      <article className="product-card">
        <div className="product-card-img-wrap">
          <img src={product.images[0]} alt={product.name} loading="lazy" />
          {product.badge && (
            <div className="product-card-badge">
              <Badge sticker color={product.badgeColor}>{product.badge}</Badge>
            </div>
          )}
        </div>

        <div className="product-card-body">
          <p className="product-card-name">{product.name}</p>
          <p className="product-card-price">{formatPrice(product.price)}</p>

          {/* Solo se muestra si el producto trae su propio "highlight" */}
          {product.highlight && (
            <p className="product-card-highlight">{product.highlight}</p>
          )}

          <div className="product-card-actions">
            <button className="btn btn-primary" onClick={handleAddToCart} title="Añadir al carrito">
              <ShoppingCart size={15} />
              Añadir
            </button>
            <Link to={`/producto/${product.id}`} className="btn btn-white" title="Ver detalle del producto">
              <Eye size={15} />
              Ver más
            </Link>
          </div>

          <button
            className="btn btn-white btn-sm btn-full"
            onClick={() => setShowDescription((s) => !s)}
            aria-expanded={showDescription}
          >
            <Info size={15} />
            {showDescription ? 'Ocultar info rápida' : 'Mostrar info rápida'}
          </button>

          {showDescription && (
            <p className="product-card-quickinfo">{product.description}</p>
          )}
        </div>
      </article>

      {toast.message && <Toast><CheckCircle2 size={16} /> Añadido al carrito</Toast>}
      {showAuthModal && <AuthModal onClose={closeAuthModal} />}
      {showSizePicker && (
        <SizePickerModal
          product={product}
          onClose={() => setShowSizePicker(false)}
          onAdded={handleAdded}
        />
      )}
    </>
  )
}