/**
 * App.jsx — Tienda Colmena
 *
 * Árbol de providers (de afuera hacia adentro):
 *   BrowserRouter → AuthProvider → CartProvider → Layout + Rutas
 *
 * AuthProvider va por fuera de CartProvider porque el carrito
 * podría necesitar saber en el futuro si el usuario está autenticado.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

import Navbar  from './components/Navbar'
import Footer  from './components/Footer'

import HomePage          from './pages/HomePage'
import CatalogPage       from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage          from './pages/CartPage'
import AuthPage          from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Navbar es sticky — siempre visible en todas las rutas */}
          <Navbar />

          {/* Contenido principal de cada ruta */}
          <main>
            <Routes>
              <Route path="/"             element={<HomePage />} />
              <Route path="/catalogo"     element={<CatalogPage />} />
              <Route path="/producto/:id" element={<ProductDetailPage />} />
              <Route path="/carrito"      element={<CartPage />} />
              <Route path="/auth"         element={<AuthPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
