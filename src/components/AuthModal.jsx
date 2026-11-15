import { useNavigate } from 'react-router-dom'
import { LogIn, UserPlus, Lock } from 'lucide-react'
import Modal from './ui/Modal'
import Button from './ui/Button'

/**
 * AuthModal
 * Aparece cuando un usuario no autenticado intenta añadir algo al carrito.
 * @param {() => void} onClose
 */
export default function AuthModal({ onClose }) {
  const navigate = useNavigate()

  const goTo = (mode) => {
    onClose()
    navigate(`/auth?mode=${mode}`)
  }

  return (
    <Modal
      onClose={onClose}
      icon={<Lock size={40} strokeWidth={1.75} />}
      title="¡Únete a la Colmena!"
      subtitle="Inicia sesión o crea tu cuenta para añadir productos a tu carrito."
    >
      <div className="modal-actions">
        <Button size="lg" full onClick={() => goTo('login')}>
          <LogIn size={18} /> Iniciar sesión
        </Button>
        <Button variant="dark" size="lg" full onClick={() => goTo('register')}>
          <UserPlus size={18} /> Crear cuenta gratis
        </Button>
        <button type="button" className="modal-link-btn" onClick={onClose}>
          Seguir viendo el catálogo
        </button>
      </div>
    </Modal>
  )
}