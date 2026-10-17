import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login, register, isAuthenticated } = useAuth()

  // El parámetro ?mode=login o ?mode=register controla qué tab está activa
  const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login')

  // Campos del formulario
  const [name,            setName]            = useState('')
  const [email,           setEmail]           = useState('')
  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass,        setShowPass]        = useState(false)

  // Estado de UI
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  const switchMode = (newMode) => {
    setMode(newMode)
    setError('')
    setSuccess('')
    setName(''); setEmail(''); setPassword(''); setConfirmPassword('')
  }

  /* ── Submit Login ── */
  const handleLogin = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)

    if (!email || !password) {
      setError('Completa todos los campos')
      setLoading(false); return
    }

    // 2. NUEVO: Validación de formato de email en Login
    if (!emailRegex.test(email.trim())) {
      setError('Por favor, ingresa un formato de email válido (ej: tu@email.com)')
      setLoading(false); return
    }

    const result = login(email.trim(), password)
    setLoading(false)

    if (!result.success) {
      setError(result.error)
    } else {
      setSuccess('¡Bienvenido/a de vuelta! Redirigiendo...')
      setTimeout(() => navigate('/'), 800)
    }
  }

  /* ── Submit Registro ── */
  const handleRegister = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)

    if (!name || !email || !password || !confirmPassword) {
      setError('Completa todos los campos'); setLoading(false); return
    }
    
    // 3. NUEVO: Validación de longitud mínima para el nombre
    if (name.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres'); setLoading(false); return
    }

    // 4. NUEVO: Validación de formato de email en Registro
    if (!emailRegex.test(email.trim())) {
      setError('Por favor, ingresa un formato de email válido (ej: tu@email.com)')
      setLoading(false); return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres'); setLoading(false); return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden'); setLoading(false); return
    }

    const result = register(name.trim(), email.trim(), password)
    setLoading(false)

    if (!result.success) {
      setError(result.error)
    } else {
      setSuccess('¡Cuenta creada! Bienvenido/a a la Colmena 🐝 Redirigiendo...')
      setTimeout(() => navigate('/'), 800)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            <LogIn size={15} style={{ display: 'inline', marginRight: 6 }} />
            Iniciar sesión
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            <UserPlus size={15} style={{ display: 'inline', marginRight: 6 }} />
            Registrarse
          </button>
        </div>

        {/* ── Formulario Login ── */}
        {mode === 'login' && (
          <form className="auth-form" onSubmit={handleLogin} noValidate>
            <div>
              <h2 className="auth-title">¡Hola de nuevo! 👋</h2>
              <p className="auth-subtitle">Ingresa a tu cuenta para continuar comprando.</p>
            </div>

            {error   && <p className="auth-error">⚠️ {error}</p>}
            {success && <p className="auth-success">✅ {success}</p>}

            <div className="input-group">
              <label className="input-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="input"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="login-password">Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                  }}
                  aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : <><LogIn size={18} /> Ingresar</>}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => switchMode('register')}
                style={{ fontWeight: 700, color: 'var(--text-main)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Regístrate gratis
              </button>
            </p>
          </form>
        )}

        {/* ── Formulario Registro ── */}
        {mode === 'register' && (
          <form className="auth-form" onSubmit={handleRegister} noValidate>
            <div>
              <h2 className="auth-title">¡Únete a la Colmena! 🐝</h2>
              <p className="auth-subtitle">Crea tu cuenta y accede a beneficios exclusivos.</p>
            </div>

            {error   && <p className="auth-error">⚠️ {error}</p>}
            {success && <p className="auth-success">✅ {success}</p>}

            <div className="input-group">
              <label className="input-label" htmlFor="reg-name">Nombre completo</label>
              <input
                id="reg-name"
                className="input"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                className="input"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="reg-password">Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="reg-password"
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="reg-confirm">Confirmar contraseña</label>
              <input
                id="reg-confirm"
                className="input"
                type={showPass ? 'text' : 'password'}
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : <><UserPlus size={18} /> Crear cuenta</>}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                style={{ fontWeight: 700, color: 'var(--text-main)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Inicia sesión
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}