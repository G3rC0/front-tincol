import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { getProductById } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import ImageCarousel from '../components/ImageCarousel'
import AuthModal from '../components/AuthModal'
import Badge from '../components/ui/Badge'
import Toast from '../components/ui/Toast'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product  = getProductById(id) 
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth()
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize]   = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showToast, setShowToast]         = useState(false)
  const [sizeError, setSizeError]         = useState(false)

  // Producto no encontrado
  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>😕</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '8px' }}>
          Producto no encontrado
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          El producto que buscas no existe o fue removido.
        </p>
        <Link to="/catalogo" className="btn btn-primary">
          ← Volver al catálogo
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Verificar auth primero
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    // Verificar talla seleccionada
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    addItem(product, selectedSize)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const AddToCartButton = ({ fullWidth = false }) => (
    <button
      className={`btn btn-primary btn-lg ${fullWidth ? 'btn-full' : ''}`}
      onClick={handleAddToCart}
    >
      <ShoppingCart size={20} />
      {selectedSize ? `Añadir talla ${selectedSize}` : 'Añadir al carrito'}
    </button>
  )

  return (
    <>
      <div className="product-detail-page">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <a href="/">Inicio</a>
            <span className="breadcrumb-sep">/</span>
            <a href="/catalogo">Catálogo</a>
            <span className="breadcrumb-sep">/</span>
            <a href={`/catalogo?cat=${product.category}`}>{product.category}</a>
            <span className="breadcrumb-sep">/</span>
            <span>{product.name}</span>
          </nav>

          {/* Layout principal */}
          <div className="product-detail-layout">
            {/* Galería — carrusel */}
            <div className="product-detail-gallery">
              <ImageCarousel images={product.images} alt={product.name} />
            </div>

            {/* Info del producto */}
            <div className="product-detail-info">
              {/* Badge + categoría */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <Badge color="blue">{product.category}</Badge>
                {product.badge && (
                  <Badge color={product.badgeColor}>{product.badge}</Badge>
                )}
              </div>

              {/* Nombre */}
              <h1 className="product-detail-name">{product.name}</h1>

              {/* Precio */}
              <p className="product-detail-price">Bs. {product.price.toFixed(2)}</p>

              {/* Descripción */}
              <p className="product-detail-desc">{product.description}</p>

              {/* Selector de talla */}
              <div className="size-selector">
                <p className="size-label">
                  Talla{' '}
                  {selectedSize && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'var(--primary)',
                        padding: '1px 8px',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.82rem',
                      }}
                    >
                      {selectedSize}
                    </span>
                  )}
                </p>
                <div className="size-chips">
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
                {sizeError && (
                  <p style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 600 }}>
                    ⚠️ Selecciona una talla antes de añadir al carrito
                  </p>
                )}
              </div>

              {/* Botón — solo visible en desktop (en móvil se usa el sticky) */}
              <div className="desktop-add-btn" style={{ gap: '12px', flexDirection: 'column' }}>
                <AddToCartButton fullWidth />
                <Link to="/catalogo" className="btn btn-white btn-full">
                  <ArrowLeft size={16} /> Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra sticky de añadir al carrito — solo en móvil */}
      <div className="sticky-cart-bar">
        <AddToCartButton fullWidth />
      </div>

      {/* Toast de éxito */}
      {showToast && (
        <Toast>✅ ¡Añadido al carrito!</Toast>
      )}

      {/* Modal de auth */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  )
}
