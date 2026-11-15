import { useState, useEffect } from 'react'

/**
 * useAsync(asyncFn, deps)
 * Ejecuta una función async y expone { data, loading, error, reload }.
 * Se vuelve a ejecutar cuando cambia algo de `deps` o al llamar reload().
 */
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))

    asyncFn()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error })
      })

    // Si el componente se desmonta o cambian las deps, ignora la respuesta vieja
    return () => { cancelled = true }
  }, [...deps, tick])

  return { ...state, reload: () => setTick((t) => t + 1) }
}