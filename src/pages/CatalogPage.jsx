import { useState, useMemo, useEffect} from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { PackageSearch, CheckCircle2 } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'
import { useToast } from '../hooks/useToast'

export default function CatalogPage() {
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const banner = useToast(3000)
    const { data: products, loading, error, reload } = useProducts()
  // Estado de filtros
  // El parámetro ?cat=Hoodies en la URL pre-selecciona la categoría
  const [filters, setFilters] = useState({
    category:   searchParams.get('cat') || 'Todos',
    sizes:      [],
    priceRange: null,
  })

  // Si la URL cambia (p.ej. desde HomeChips), actualizamos el filtro de categoría
  useEffect(() => {
    const cat = searchParams.get('cat') || 'Todos'
    setFilters((f) => ({ ...f, category: cat }))
  }, [searchParams])

  // Filtrado reactivo — se recalcula solo cuando cambian productos o filtros
  const filtered = useMemo(() => {
    return (products ?? []).filter((p) => {
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
  }, [products, filters])

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Inicio</Link>
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
        <div className="section-header section-header--tight">
          <h1 className="section-title">
            {filters.category === 'Todos' ? 'Todo el catálogo' : filters.category}
          </h1>
          {!loading && (
            <span className="result-count">
              {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
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

          {banner.message && (
            <div className="add-banner" role="status">
              <CheckCircle2 size={18} /> Añadiste <strong>"{banner.message}"</strong> al carrito
            </div>
          )}

          {/* Grid de productos */}
          <div className="catalog-results">
            {loading ? (
              <div className="empty-state">
                <p className="empty-state-title">Cargando productos...</p>
              </div>
            ) : error ? (
              <div className="empty-state">
                <p className="empty-state-title">No pudimos cargar el catálogo</p>
                <p className="empty-state-desc">Revisa tu conexión e inténtalo de nuevo.</p>
                <button className="btn btn-primary" onClick={reload}>Reintentar</button>
              </div>
            ) : filtered.length > 0 ? (       
              <div className="product-grid">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddedToCart={banner.show}
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
