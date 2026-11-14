import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Marca */}
          <div>
            <div className="footer-brand-name">🐝 Tienda Colmena</div>
            <p className="footer-tagline">
              Streetwear auténtico hecho para la calle. <br />
              Viste diferente. Viste Colmena.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <p className="footer-col-title">Tienda</p>
            <div className="footer-links">
              <Link to="/">Inicio</Link>
              <Link to="/catalogo">Catálogo</Link>
              <Link to="/catalogo?cat=Camisetas">Camisetas</Link>
              <Link to="/catalogo?cat=Hoodies">Hoodies</Link>
              <Link to="/catalogo?cat=Pantalones">Pantalones</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="footer-col-title">Info</p>
            <div className="footer-links">
              <a href="#">Sobre nosotros</a>
              <a href="#">Guía de tallas</a>
              <a href="#">Envíos y devoluciones</a>
              <a href="#">Contacto</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tienda Colmena. Todos los derechos reservados.</span>
<span className="footer-credit">            Hecho con 🐝 en Bolivia
          </span>
        </div>
      </div>
    </footer>
  )
}
