import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { getFeaturedProducts, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

const CATEGORY_EMOJIS = {
  Todos:      '🛍️',
  Camisetas:  '👕',
  Hoodies:    '🧥',
  Pantalones: '👖',
  Accesorios: '🧢',
}

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <div>
      {/* ── Hero ──────────────────────────────── */}
      <section className="hero">
        <div className="container hero-inner">
          {/* Eyebrow */}
          <span className="hero-eyebrow">
            <Zap size={13} fill="currentColor" /> Nueva Colección 2025
          </span>

          {/* Título principal */}
          <h1 className="hero-title">
            VISTE<br />
            LA&nbsp;<span>CALLE.</span>
          </h1>

          {/* Subtítulo */}
          <p className="hero-subtitle">
            Streetwear auténtico para la gente que no sigue tendencias — las crea.
            Ropa con carácter, hecha para durar.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link to="/catalogo" className="btn btn-dark btn-lg">
              Ver catálogo <ArrowRight size={18} />
            </Link>
            <Link to="/catalogo?cat=Hoodies" className="btn btn-primary btn-lg">
              🧥 Hoodies
            </Link>
          </div>

          {/* Badge decorativo */}
          <div className="hero-deco">
            <div className="hero-badge-big">
              🐝 Tienda Colmena <br />
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Hecho en Bolivia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categorías ─────────────────────────── */}
      <section className="page-section" style={{ paddingTop: '0' }}>
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
                <span>{CATEGORY_EMOJIS[cat]}</span>
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
            <h2 className="section-title">Lo más nuevo 🔥</h2>
            <Link to="/catalogo" className="btn btn-white btn-sm">
              Ver todo <ArrowRight size={14} />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────── */}
      <div className="container">
        <div className="cta-banner">
          <div>
            <h2 className="cta-banner-title">
              🐝 Únete a la Colmena
            </h2>
            <p className="cta-banner-sub">
              Crea tu cuenta y accede a descuentos exclusivos para miembros.
            </p>
          </div>
          <Link to="/auth?mode=register" className="btn btn-dark btn-lg" style={{ flexShrink: 0 }}>
            Registrarse gratis <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
