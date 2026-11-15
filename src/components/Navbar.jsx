import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, LogOut, User, UserPlus, Home, Shirt } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const close = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    close()
    navigate('/')
  }

  return (
    <>
      <nav className="navbar">
        <div className="container nav-inner">
          {/* Logo */}
          <Link to="/" className="brand" onClick={close}>
            <span className="brand-badge">🐝</span>
            <span className="brand-name">Tienda Colmena</span>
          </Link>

          {/* Desktop: links + acciones */}
          <div className="nav-links-desktop">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Inicio
            </NavLink>
            <NavLink
              to="/catalogo"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Catálogo
            </NavLink>

            {/* Carrito */}
            <Link to="/carrito" className="nav-cart-btn" title="Mi carrito">
              <ShoppingCart size={20} />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <>
                <span className="nav-user-chip">
                  <User size={14} /> {user.name.split(' ')[0]}
                </span>
                <button onClick={handleLogout} className="btn btn-white btn-sm">
                  <LogOut size={15} /> Salir
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth?mode=login')}
                  className="btn btn-white btn-sm"
                >
                  <User size={15} /> Ingresar
                </button>
                <button
                  onClick={() => navigate('/auth?mode=register')}
                  className="btn btn-primary btn-sm"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>

          {/* Mobile: carrito + hamburger */}
          <div className="nav-mobile-icons">
            <Link to="/carrito" className="nav-cart-btn" title="Mi carrito" onClick={close}>
              <ShoppingCart size={20} />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={close}>
            <Home size={20} /> Inicio
          </Link>
          <Link to="/catalogo" className="mobile-link" onClick={close}>
            <Shirt size={20} /> Catálogo
          </Link>
          <Link to="/carrito" className="mobile-link" onClick={close}>
            <ShoppingCart size={20} /> Carrito {itemCount > 0 && `(${itemCount})`}
          </Link>

          <hr className="divider divider-tight" />    
          {isAuthenticated ? (
            <>
              <div className="mobile-link mobile-link-user">
                <User size={20} /> Hola, {user.name.split(' ')[0]}
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-white btn-full"
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth?mode=login"
                className="btn btn-white btn-full"
                onClick={close}
              >
                <User size={16} /> Ingresar
              </Link>
              <Link
                to="/auth?mode=register"
                className="btn btn-primary btn-full"
                onClick={close}
              >
                <UserPlus size={16} /> Crear cuenta
              </Link>
            </>
          )}
        </div>
      )}
    </>
  )
}
