/**
 * Constantes de la interfaz del catálogo.
 * No son datos de producto: son opciones fijas de filtros y navegación.
 */

export const CATEGORIES = ['Todos', 'Camisetas', 'Hoodies', 'Pantalones', 'Accesorios']

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRICE_RANGES = [
  { label: 'Hasta Bs. 50',      min: 0,   max: 50 },
  { label: 'Bs. 50 – 100',      min: 50,  max: 100 },
  { label: 'Bs. 100 – 200',     min: 100, max: 200 },
  { label: 'Más de Bs. 200',    min: 200, max: Infinity },
]