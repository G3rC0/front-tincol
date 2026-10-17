/**
 * validateEmail(email)
 * Verifica que el string tenga formato de email válido.
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

/**
 * validatePassword(password)
 * Reglas mínimas: al menos 6 caracteres.
 * Agrega más reglas aquí si tu backend las exige.
 * @param {string} password
 * @returns {{ valid: boolean, error: string }}
 */
export function validatePassword(password) {
  if (!password || password.length < 6) {
    return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' }
  }
  return { valid: true, error: '' }
}

/**
 * validateRequired(fields)
 * Verifica que todos los campos del objeto tengan valor.
 * @param {Record<string, string>} fields - { nombre: valor, ... }
 * @returns {{ valid: boolean, error: string }}
 *
 * Ejemplo:
 *   validateRequired({ nombre: name, email: email })
 *   → { valid: false, error: 'El campo "nombre" es obligatorio' }
 */
export function validateRequired(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || String(value).trim() === '') {
      return { valid: false, error: `El campo "${key}" es obligatorio` }
    }
  }
  return { valid: true, error: '' }
}
