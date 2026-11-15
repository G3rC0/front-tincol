import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * useToast(duration)
 * Muestra un valor temporal y lo borra solo pasado `duration` ms.
 *
 * Uso:
 *   const toast = useToast(2000)
 *   toast.show()              → toast.message pasa a true
 *   toast.show('Hoodie Negro') → toast.message = 'Hoodie Negro'
 *   toast.message             → null cuando no hay aviso activo
 */
export function useToast(duration = 2000) {
  const [message, setMessage] = useState(null)
  const timerRef = useRef(null)

  const hide = useCallback(() => {
    clearTimeout(timerRef.current)
    setMessage(null)
  }, [])

  const show = useCallback((msg = true) => {
    clearTimeout(timerRef.current)   // si llega otro aviso, reinicia el conteo
    setMessage(msg)
    timerRef.current = setTimeout(() => setMessage(null), duration)
  }, [duration])

  // Al desmontar el componente, cancela el temporizador pendiente
  useEffect(() => () => clearTimeout(timerRef.current), [])

  return { message, show, hide }
}