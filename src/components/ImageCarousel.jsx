import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * ImageCarousel
 * @param {string[]} images - array de URLs de imágenes
 * @param {string}   alt    - texto alternativo base
 */
export default function ImageCarousel({ images = [], alt = 'Producto' }) {
  const [current, setCurrent] = useState(0)

  if (images.length === 0) return null

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  return (
    <div className="carousel">
      {/* Track de imágenes */}
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="carousel-slide">
            <img
              src={src}
              alt={`${alt} — ángulo ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Flechas — solo si hay más de 1 imagen */}
      {images.length > 1 && (
        <>
          <button className="carousel-btn prev" onClick={prev} aria-label="Imagen anterior">
            <ChevronLeft size={18} />
          </button>
          <button className="carousel-btn next" onClick={next} aria-label="Imagen siguiente">
            <ChevronRight size={18} />
          </button>

          {/* Puntos indicadores */}
          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
