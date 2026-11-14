import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found-icon">🐝</div>
      <h1 className="not-found-title">404 — Página no encontrada</h1>
      <p className="not-found-text">La página que buscas no existe o fue movida.</p>
      <Link to="/" className="btn btn-primary btn-lg">Volver al inicio</Link>
    </div>
  )
}