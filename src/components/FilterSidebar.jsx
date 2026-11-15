import { CATEGORIES, SIZES, PRICE_RANGES } from '../constants/catalog'
import { SlidersHorizontal, X, ChevronUp, ChevronDown } from 'lucide-react'

/**
 * FilterSidebar
 * En móvil se muestra/oculta con el botón externo (isOpen / onToggle).
 * En desktop siempre visible via CSS.
 *
 * @param {object}   filters          - estado de filtros { category, sizes[], priceRange }
 * @param {function} onFilterChange   - callback cuando cambia algún filtro
 * @param {boolean}  isOpen           - control de visibilidad en móvil
 * @param {function} onToggle         - abre/cierra el sidebar en móvil
 * @param {number}   resultCount      - cantidad de productos visibles (para mostrar "X resultados")
 */
export default function FilterSidebar({ filters, onFilterChange, isOpen, onToggle, resultCount }) {

  const toggleSize = (size) => {
    const current = filters.sizes
    const next = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size]
    onFilterChange({ ...filters, sizes: next })
  }

  const hasActiveFilters =
    filters.category !== 'Todos' ||
    filters.sizes.length > 0 ||
    filters.priceRange !== null

  const clearAll = () => {
    onFilterChange({ category: 'Todos', sizes: [], priceRange: null })
  }

  return (
    <>
      {/* Botón toggle — solo visible en móvil (CSS lo oculta en desktop) */}
      <button className="filter-toggle-btn" onClick={onToggle}>
        <span className="filter-toggle-label">
          <SlidersHorizontal size={18} />
          Filtros
          {hasActiveFilters && (
            <span className="badge badge-coral badge-sm">
              Activos
            </span>
          )}
        </span>
        <span>{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
      </button>

      {/* Panel de filtros */}
      <aside className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header del sidebar */}
        <div className="filter-header">
          <span className="filter-header-title">
            Filtros
          </span>
          <div className="filter-header-actions">
            {typeof resultCount === 'number' && (
              <span className="filter-count">
                {resultCount} result.
              </span>
            )}
            {hasActiveFilters && (
              <button onClick={clearAll} className="filter-clear-link">
                <X size={13} /> Limpiar
              </button>
            )}
          </div>
        </div>

        {/* ── Categoría ── */}
        <div className="filter-section">
          <p className="filter-section-title">Categoría</p>
          {CATEGORIES.map((cat) => (
            <label key={cat} className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => onFilterChange({ ...filters, category: cat })}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>

        {/* ── Talla ── */}
        <div className="filter-section">
          <p className="filter-section-title">Talla</p>
          <div className="size-chips">
            {SIZES.map((size) => (
              <button
                key={size}
                className={`size-chip ${filters.sizes.includes(size) ? 'selected' : ''}`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ── Precio ── */}
        <div className="filter-section">
          <p className="filter-section-title">Precio</p>
          {PRICE_RANGES.map((range, i) => (
            <label key={i} className="filter-option">
              <input
                type="radio"
                name="price"
                checked={
                  filters.priceRange?.min === range.min &&
                  filters.priceRange?.max === range.max
                }
                onChange={() =>
                  onFilterChange({
                    ...filters,
                    priceRange: filters.priceRange?.min === range.min ? null : range,
                  })
                }
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>

        {/* Botón limpiar — versión grande al fondo */}
        {hasActiveFilters && (
          <button className="btn btn-white btn-full btn-sm" onClick={clearAll}>
            <X size={14} /> Limpiar todos los filtros
          </button>
        )}
      </aside>
    </>
  )
}
