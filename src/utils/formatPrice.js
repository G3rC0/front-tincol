/**
 * formatPrice(price)
 * Convierte un número a formato de precio boliviano.
 * Ejemplo: formatPrice(89.9) → "Bs. 89.90"
 *
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price) {
  if (typeof price !== 'number' || isNaN(price)) return 'Bs. 0.00'
  return `Bs. ${price.toFixed(2)}`
}

/**
 * formatPriceShort(price)
 * Versión corta sin decimales cuando son .00
 * Ejemplo: formatPriceShort(100.00) → "Bs. 100"
 *          formatPriceShort(89.90)  → "Bs. 89.90"
 *
 * @param {number} price
 * @returns {string}
 */
export function formatPriceShort(price) {
  if (typeof price !== 'number' || isNaN(price)) return 'Bs. 0'
  return price % 1 === 0 ? `Bs. ${price}` : `Bs. ${price.toFixed(2)}`
}
