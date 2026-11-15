/**
 * AuthContext — Tienda Colmena
 *
 * Simula autenticación usando localStorage.
 * Cuando conectes tu API Node/Express, reemplaza las funciones
 * login() y register() con llamadas fetch a tu backend:
 *   POST /api/auth/login    → { token, user }
 *   POST /api/auth/register → { token, user }
 * y guarda el token JWT en localStorage en vez del objeto user.
 */

import { createContext, useContext, useState } from 'react'

// ⚠️ SOLO PARA DESARROLLO: las contraseñas se guardan en texto plano en localStorage.
// Antes de producción esto debe moverse al backend (hash con bcrypt/argon2 + JWT).
// Ver sección "Seguridad" del README.
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Persistimos la sesión en localStorage para que sobreviva al refresh
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('colmena_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  /**
   * login(email, password)
   * @returns {{ success: boolean, error?: string }}
   *
   * TODO API: reemplazar por:
   *   const res = await fetch('/api/auth/login', { method:'POST', body: JSON.stringify({email,password}), headers:{'Content-Type':'application/json'} })
   *   const data = await res.json()
   *   if (!res.ok) return { success: false, error: data.message }
   *   localStorage.setItem('colmena_token', data.token)
   *   setUser(data.user)
   *   return { success: true }
   */
  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('colmena_users') || '[]')
      const found = users.find((u) => u.email === email && u.password === password)
      if (!found) return { success: false, error: 'Email o contraseña incorrectos' }

      // No guardamos la contraseña en el estado activo
      const { password: _pw, ...safeUser } = found
      setUser(safeUser)
      localStorage.setItem('colmena_user', JSON.stringify(safeUser))
      return { success: true }
    } catch {
      return { success: false, error: 'Error al iniciar sesión. Intenta de nuevo.' }
    }
  }

  /**
   * register(name, email, password)
   * @returns {{ success: boolean, error?: string }}
   */
  const register = (name, email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('colmena_users') || '[]')
      if (users.find((u) => u.email === email)) {
        return { success: false, error: 'Ya existe una cuenta con ese email' }
      }

      const newUser = { id: Date.now(), name, email, password }
      localStorage.setItem('colmena_users', JSON.stringify([...users, newUser]))

      const { password: _pw, ...safeUser } = newUser
      setUser(safeUser)
      localStorage.setItem('colmena_user', JSON.stringify(safeUser))
      return { success: true }
    } catch {
      return { success: false, error: 'Error al registrarse. Intenta de nuevo.' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('colmena_user')
    // TODO API: también borrar el token JWT: localStorage.removeItem('colmena_token')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado — usar siempre esto en lugar de useContext(AuthContext) directamente
export const useAuth = () => useContext(AuthContext)
