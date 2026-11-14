import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Modal genérico: overlay + caja + botón cerrar.
 * Todas las props de cabecera son opcionales.
 */
export default function Modal({ onClose, icon, eyebrow, title, subtitle, children }) {
  // Cerrar con la tecla Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Cerrar al hacer clic en el fondo (no dentro de la caja)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const hasHeader = icon || eyebrow || title || subtitle

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-label={title}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={16} />
        </button>

        {hasHeader && (
          <header className="modal-header">
            {icon && <div className="modal-icon">{icon}</div>}
            {eyebrow && <p className="modal-eyebrow">{eyebrow}</p>}
            {title && <h2 className="modal-title">{title}</h2>}
            {subtitle && <p className="modal-subtitle">{subtitle}</p>}
          </header>
        )}

        {children}
      </div>
    </div>
  )
}