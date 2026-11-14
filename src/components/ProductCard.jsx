import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Info } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import SizePickerModal from './SizePickerModal'
import Badge from './ui/Badge'
import Toast from './ui/Toast'

export default function ProductCard({ product, onAddedToCart }) {
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal]     = useState(false)
  const [showSizePicker, setShowSizePicker]   = useState(false)
  const [showToast, setShowToast]             = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  const handleAddToCart = () => {
    if (!isAuthenticated) setShowAuthModal(true)
    else setShowSizePicker(true)
  }

    const handleAdded = () => {
      if (onAddedToCart) {
        onAddedToCart(product.name)   // catálogo: lo muestra el padre
        return
      }
      setShowToast(true)              // home: lo muestra la propia tarjeta
      setTimeout(() => setShowToast(false), 2000)
    }


  return (
    <>
      <article className="product-card">
        <div className="product-card-img-wrap">
          <img src={product.images[0]} alt={product.name} loading="lazy" />
          {product.badge && (
            <div className="product-card-badge">
              <Badge color={product.badgeColor}>{product.badge}</Badge>
            </div>
          )}
        </div>

        <div className="product-card-body">
          <p className="product-card-name">{product.name}</p>
          <p className="product-card-price">Bs. {product.price.toFixed(2)}</p>

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

         {showToast && <Toast>✅ Añadido al carrito</Toast>}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
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