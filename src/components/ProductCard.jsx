import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Info } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import SizePickerModal from './SizePickerModal'



export default function ProductCard({ product, onAddedToCart }) {
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal]   = useState(false)
  const [showSizePicker, setShowSizePicker] = useState(false)
  const [showToast, setShowToast]           = useState(false)
  
  const [showDescription, setShowDescription] = useState(false)

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    } else {
      setShowSizePicker(true)
    }
  }

  const handleAdded = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)

    onAd  
  }

  const badgeClass =
    product.badgeColor === 'green' ? 'badge badge-green' :
    product.badgeColor === 'coral' ? 'badge badge-coral' :
    'badge badge-yellow'

  const categoryHighlights = {
    'abrigos':  <span style={{ color: '#0056b3', fontSize: '0.8rem', fontWeight: 'bold' }}>❄️ Ideal para el invierno</span>,
    'jeans':    <span style={{ color: '#28a745', fontSize: '0.8rem', fontWeight: 'bold' }}>👖 Denim de alta resistencia</span>,
    'vestidos': <span style={{ color: '#fd7e14', fontSize: '0.8rem', fontWeight: 'bold' }}>✨ Colección de temporada</span>,
    'Camisetas  ':  <span style={{ color: '#6f42c1', fontSize: '0.8rem', fontWeight: 'bold' }}>👕 100% Algodón pima</span>
  }

  return (
    <>
      <article className="product-card">
        {/* Imagen */}
        <div className="product-card-img-wrap">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
          />
          {product.badge && (
            <div className="product-card-badge">
              <span className={badgeClass}>{product.badge}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-card-body">
          <p className="product-card-name">{product.name}</p>
          <p className="product-card-price">Bs. {product.price.toFixed(2)}</p>

          {/* RENDERIZADO CONDICIONAL POR CATEGORÍA DE ROPA */}
          <div style={{ marginBottom: '10px', marginTop: '5px' }}>
            {categoryHighlights[product.category] || (
              <span style={{ color: '#6c757d', fontSize: '0.8rem' }}>🏷️ Básico imprescindible</span>
            )}
          </div>

          {/* Acciones principales */}
          <div className="product-card-actions">
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              title="Añadir al carrito"
            >
              <ShoppingCart size={15} />
              Añadir
            </button>
            <Link
              to={`/producto/${product.id}`}
              className="btn btn-white"
              title="Ver detalle del producto"
            >
              <Eye size={15} />
              Ver más
            </Link>
          </div>

          {/* BOTÓN nuevo */}
          <button 
            className="btn btn-white" 
            onClick={() => setShowDescription(!showDescription)}
            style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '5px' }}
          >
            <Info size={15} />
            {showDescription ? 'Ocultar info rápida' : 'Mostrar info rápida'}
          </button>

          
          {showDescription && (
            <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666', background: '#f9f9f9', padding: '8px', borderRadius: '4px' }}>
              <p>{product.description || 'Un producto excelente y de alta calidad, ideal para tu día a día.'}</p>
            </div>
          )}
        </div>
      </article>

      {/* Toast de confirmación */}
      {showToast && (
        <div className="toast">
          ✅ Añadido al carrito
        </div>
      )}

      {/* Modal: requiere auth */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {/* Modal: selector de talla */}
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