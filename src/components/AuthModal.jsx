import { useNavigate } from 'react-router-dom'
import { X, LogIn, UserPlus } from 'lucide-react'

/**
 * AuthModal
 * Aparece cuando un usuario no autenticado intenta añadir algo al carrito.
 * @param {() => void} onClose - función para cerrar el modal
 */
export default function AuthModal({ onClose }) {
  const navigate = useNavigate()

  const goTo = (mode) => {
    onClose()
    navigate(`/auth?mode=${mode}`)
  }

  // Cerrar al hacer clic en el overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>🔒</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
              ¡Únete a la Colmena!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px', lineHeight: 1.5 }}>
              Inicia sesión o crea tu cuenta para añadir productos a tu carrito.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', flexShrink: 0,
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface-alt)', cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Acciones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => goTo('login')} className="btn btn-primary btn-full btn-lg">
            <LogIn size={18} /> Iniciar sesión
          </button>
          <button onClick={() => goTo('register')} className="btn btn-dark btn-full btn-lg">
            <UserPlus size={18} /> Crear cuenta gratis
          </button>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', padding: '8px' }}
          >
            Seguir viendo el catálogo
          </button>
        </div>
      </div>
    </div>
  )
}
