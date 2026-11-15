/**
 * Badge — color: yellow | green | coral | purple | blue | dark
 * Si el producto trae badgeColor null, usa amarillo por defecto.
 * sticker: variante con borde blanco e inclinación (Nuevo / Oferta).
 */
export default function Badge({ color, sticker = false, children }) {
  const classes = [
    'badge',
    `badge-${color ?? 'yellow'}`,
    sticker && 'badge-sticker',
  ].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}