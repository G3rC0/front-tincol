import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'  
import { ShoppingCart, ArrowLeft, PackageSearch, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import ImageCarousel from '../components/ImageCarousel'
import AuthModal from '../components/AuthModal'
import Badge from '../components/ui/Badge'
import Toast from '../components/ui/Toast'
import { formatPrice } from '../utils/formatPrice'
import { useToast } from '../hooks/useToast'
import { useRequireAuth } from '../hooks/useRequireAuth'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { data: product, loading, error, reload } = useProduct(id)

  const { requireAuth, showAuthModal, closeAuthModal } = useRequireAuth()
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize]   = useState(null)
  const toast     = useToast()
  const sizeError = useToast()

    // Cargando
  if (loading) {
    return (
      <div className="container not-found">
        <p className="not-found-text">Cargando producto...</p>
      </div>
    )
  }

  // Error de red
  if (error) {
    return (
      <div className="container not-found">
        <h2 className="not-found-title">No pudimos cargar el producto</h2>
        <p className="not-found-text">Revisa tu conexión e inténtalo de nuevo.</p>
        <button className="btn btn-primary" onClick={reload}>Reintentar</button>
      </div>
    )
  }

  // Producto no encontrado
  if (!product) {
    return (
      <div className="container not-found">
        <div className="not-found-icon"><PackageSearch size={56} strokeWidth={1.5} /></div>
        <h2 className="not-found-title">Producto no encontrado</h2>
        <p className="not-found-text">El producto que buscas no existe o fue removido.</p>
        <Link to="/catalogo" className="btn btn-primary">
          ← Volver al catálogo
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => requireAuth(() => {
    // Verificar talla seleccionada
    if (!selectedSize) {
      sizeError.show()
      return
    }
    addItem(product, selectedSize)
    toast.show()
  })

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
            <Link to="/">Inicio</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/catalogo">Catálogo</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to={`catalogo?cat=${product.category}`}>{product.category}</Link>
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
              <div className="product-badges">
                <Badge color="blue">{product.category}</Badge>
                {product.badge && (
                  <Badge sticker color={product.badgeColor}>{product.badge}</Badge>
                )}
              </div>

              {/* Nombre */}
              <h1 className="product-detail-name">{product.name}</h1>

              {/* Precio */}
              <p className="product-detail-price">{formatPrice(product.price)}</p>
              {/* Descripción */}
              <p className="product-detail-desc">{product.description}</p>

              {/* Selector de talla */}
              <div className="size-selector">
                <p className="size-label">
                  Talla{' '}
                  {selectedSize && (
                    <span className="size-selected-chip">{selectedSize}</span>
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
                {sizeError.message && (
                  <p className="size-error">
                    <AlertTriangle size={14} /> Selecciona una talla antes de añadir al carrito
                  </p>
                )}
              </div>

              {/* Botón — solo visible en desktop (en móvil se usa el sticky) */}
              <div className="desktop-add-btn">
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
      {toast.message && (
        <Toast><CheckCircle2 size={16} /> ¡Añadido al carrito!</Toast>
      )}

      {/* Modal de auth */}
      {showAuthModal && (
        <AuthModal onClose={closeAuthModal} />
      )}
    </>
  )
}
