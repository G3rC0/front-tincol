import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { CATEGORIES } from '../constants/catalog'
import { useFeaturedProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'


export default function HomePage() {
  const { data: featured, loading, error, reload } = useFeaturedProducts()

  return (
    <div>
      {/* ── Hero ──────────────────────────────── */}
      <section className="hero">
        <div className="container hero-inner">
          {/* Eyebrow */}
          <span className="hero-eyebrow">
            <Zap size={13} fill="currentColor" /> Nueva colección
          </span>

          {/* Título principal */}
          <h1 className="hero-title">
            VISTE<br />
            LA&nbsp;<span>CALLE.</span>
          </h1>

          {/* Subtítulo */}
          <p className="hero-subtitle">
            Camisetas, hoodies, pantalones y accesorios de corte relajado
            para el día a día en la ciudad.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link to="/catalogo" className="btn btn-dark btn-lg">
              Ver catálogo <ArrowRight size={18} />
            </Link>
            <Link to="/catalogo?cat=Hoodies" className="btn btn-primary btn-lg">
              Hoodies
            </Link>
          </div>

          {/* Badge decorativo */}
          <div className="hero-deco">
            <div className="hero-badge-big">
              🐝 Tienda Colmena <br />
              <span className="hero-badge-sub">                
                Hecho en Bolivia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categorías ─────────────────────────── */}
      <section className="page-section page-section--flush">        
          <div className="container">
          <div className="section-header">
            <h2 className="section-title">Categorías</h2>
          </div>
          <div className="categories-scroll">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={cat === 'Todos' ? '/catalogo' : `/catalogo?cat=${cat}`}
                className="cat-chip"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Productos Destacados ────────────────── */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo más nuevo</h2>
            <Link to="/catalogo" className="btn btn-white btn-sm">
              Ver todo <ArrowRight size={14} />
            </Link>
          </div>
          {loading ? (
            <p className="section-status">Cargando productos...</p>
          ) : error ? (
            <p className="section-status">
              No pudimos cargar los productos.
              <button className="btn btn-white btn-sm" onClick={reload}>Reintentar</button>
            </p>
          ) : (
            <div className="product-grid">
              {(featured ?? []).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────── */}
      <div className="container">
        <div className="cta-banner">
          <div>
            <h2 className="cta-banner-title">
              Únete a la Colmena
            </h2>
            <p className="cta-banner-sub">
              Crea tu cuenta para armar tu carrito y comprar más rápido.
            </p>
          </div>
          <Link to="/auth?mode=register" className="btn btn-dark btn-lg cta-banner-btn">
            Registrarse gratis <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
