/**
 * api.js — Cliente HTTP centralizado
 * ─────────────────────────────────────────────────────────────
 * Todas las llamadas a tu backend Node/Express + Oracle pasan
 * por aquí. Así si cambias la URL base o el token JWT, solo
 * lo tocas en un lugar.
 *
 * CONFIGURACIÓN:
 *   Crea un archivo .env en la raíz del proyecto con:
 *   VITE_API_URL=http://localhost:3000/api
 *
 * USO (ejemplo desde CatalogPage):
 *   import { api } from '../utils/api'
 *   const productos = await api.get('/productos')
 *   const nuevo    = await api.post('/productos', { nombre: 'Hoodie' })
 * ─────────────────────────────────────────────────────────────
 */

// Vite expone las variables de entorno con el prefijo VITE_
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Función base que ejecuta el fetch y maneja errores de red y de API.
 * @param {string} endpoint  - ruta relativa, ej: '/productos'
 * @param {RequestInit} options - opciones de fetch
 * @returns {Promise<any>} - JSON de respuesta
 */
async function request(endpoint, options = {}) {
  // Recuperar el token JWT si existe (cuando implementes auth en el backend)
  const token = localStorage.getItem('colmena_token')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Adjuntar token si existe
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config)

  // Si la respuesta no es 2xx, lanzar un error con el mensaje del backend
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Error desconocido' }))
    throw new Error(errorData.message || `Error ${res.status}`)
  }

  // Manejar respuestas 204 (sin contenido)
  if (res.status === 204) return null

  return res.json()
}

/** Métodos HTTP listos para usar */
export const api = {
  /** GET /endpoint */
  get: (endpoint) =>
    request(endpoint, { method: 'GET' }),

  /** POST /endpoint con body JSON */
  post: (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) }),

  /** PUT /endpoint con body JSON */
  put: (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),

  /** PATCH /endpoint con body JSON parcial */
  patch: (endpoint, body) =>
    request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),

  /** DELETE /endpoint */
  delete: (endpoint) =>
    request(endpoint, { method: 'DELETE' }),
}

/*
 * ── EJEMPLOS DE USO CUANDO CONECTES EL BACKEND ──────────────
 *
 * Productos:
 *   api.get('/productos')              → GET  /api/productos
 *   api.get('/productos/1')            → GET  /api/productos/1
 *   api.post('/productos', data)       → POST /api/productos
 *
 * Auth:
 *   api.post('/auth/login', creds)     → POST /api/auth/login
 *   api.post('/auth/register', data)   → POST /api/auth/register
 *
 * Carrito (si lo mueves al backend):
 *   api.get('/carrito')                → GET  /api/carrito
 *   api.post('/carrito/items', item)   → POST /api/carrito/items
 * ─────────────────────────────────────────────────────────────
 */
