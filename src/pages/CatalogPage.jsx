import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PackageSearch } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

export default function CatalogPage() {
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  // Estado de filtros
  // El parámetro ?cat=Hoodies en la URL pre-selecciona la categoría
  const [filters, setFilters] = useState({
    category:   searchParams.get('cat') || 'Todos',
    sizes:      [],
    priceRange: null,
  })

  // Si la URL cambia (p.ej. desde HomeChips), actualizamos el filtro de categoría
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setFilters((f) => ({ ...f, category: cat }))
  }, [searchParams])

  // Filtrado reactivo — se recalcula solo cuando cambian productos o filtros
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Categoría
      if (filters.category !== 'Todos' && p.category !== filters.category) return false

      // Tallas (si hay tallas seleccionadas, el producto debe tener al menos una)
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some((s) => p.sizes.includes(s))
        if (!hasSize) return false
      }

      // Rango de precio
      if (filters.priceRange) {
        if (p.price < filters.priceRange.min || p.price > filters.priceRange.max) return false
      }

      return true
    })
  }, [filters])

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Inicio</a>
          <span className="breadcrumb-sep">/</span>
          <span>Catálogo</span>
          {filters.category !== 'Todos' && (
            <>
              <span className="breadcrumb-sep">/</span>
              <span>{filters.category}</span>
            </>
          )}
        </nav>

        {/* Título de página */}
        <div className="section-header" style={{ marginBottom: '20px' }}>
          <h1 className="section-title">
            {filters.category === 'Todos' ? 'Todo el catálogo 👕' : filters.category}
          </h1>
          <span
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
              color: 'var(--text-muted)', marginLeft: 'auto',
            }}
          >
            {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Layout: sidebar + grid */}
        <div className="catalog-layout">
          {/* Sidebar con filtros */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen((o) => !o)}
            resultCount={filtered.length}
          />

          {lastAdded && (
            <div style={{
              padding: '12px 16px',
              marginBottom: '16px',
              background: 'var(--green)',
              border: '3px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-sm)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}>
              ✅ Añadiste <strong>"{lastAdded}"</strong> al carrito
            </div>
          )}

          {/* Grid de productos */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {filtered.length > 0 ? (
              <div className="product-grid">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddedToCart={(productName) => {
                      setLastAdded(productName)           // padre actualiza su estado
                      setTimeout(() => setLastAdded(null), 3000)  // se limpia solo
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Estado vacío cuando no hay resultados */
              <div className="empty-state">
                <div className="empty-state-icon">
                  <PackageSearch size={48} strokeWidth={1.5} />
                </div>
                <p className="empty-state-title">Sin resultados</p>
                <p className="empty-state-desc">
                  Ningún producto coincide con los filtros seleccionados.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setFilters({ category: 'Todos', sizes: [], priceRange: null })
                  }
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
