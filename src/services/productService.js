import { api } from '../utils/api'
import { products as mockProducts } from '../data/products'

// true  → datos de ejemplo (src/data/products.js)
// false → API real (VITE_API_URL). Se controla desde el .env
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const MOCK_DELAY = 300 // ms, simula la red para ver los estados de carga

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Único lugar donde se adapta la forma de los datos del backend a la que
 * usan los componentes. Oracle suele devolver las columnas en MAYÚSCULAS
 * (PRECIO, NOMBRE...), así que ese mapeo se haría aquí, por ejemplo:
 *   id: p.ID, name: p.NOMBRE, price: Number(p.PRECIO), ...
 */
function normalizeProduct(p) {
  return {
    ...p,
    price: Number(p.price),
    sizes: p.sizes ?? [],
    images: p.images ?? [],
  }
}

/** GET /productos */
export async function getProducts() {
  if (USE_MOCK) {
    await wait(MOCK_DELAY)
    return mockProducts
  }
  const data = await api.get('/productos')
  return data.map(normalizeProduct)
}

/** GET /productos/:id  (devuelve null si no existe, en modo mock) */
export async function getProductById(id) {
  if (USE_MOCK) {
    await wait(MOCK_DELAY)
    return mockProducts.find((p) => p.id === Number(id)) ?? null
  }
  return normalizeProduct(await api.get(`/productos/${id}`))
}

/** GET /productos?featured=true */
export async function getFeaturedProducts() {
  if (USE_MOCK) {
    await wait(MOCK_DELAY)
    return mockProducts.filter((p) => p.featured)
  }
  const data = await api.get('/productos?featured=true')
  return data.map(normalizeProduct)
}