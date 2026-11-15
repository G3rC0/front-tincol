import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

/**
 * useRequireAuth()
 * Puerta de login para acciones que exigen sesión.
 *
 * Uso:
 *   const { requireAuth, showAuthModal, closeAuthModal } = useRequireAuth()
 *   const handleClick = () => requireAuth(() => hacerAlgo())
 *   {showAuthModal && <AuthModal onClose={closeAuthModal} />}
 *
 * Si hay sesión → ejecuta la acción.
 * Si no → abre el modal de login y NO ejecuta la acción.
 */
export function useRequireAuth() {
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const requireAuth = useCallback((action) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    action()
  }, [isAuthenticated])

  const closeAuthModal = useCallback(() => setShowAuthModal(false), [])

  return { requireAuth, showAuthModal, closeAuthModal }
}