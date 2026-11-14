/**
 * Badge — color: yellow | green | coral | purple | blue | dark
 * Si el producto trae badgeColor null, usa amarillo por defecto.
 */
export default function Badge({ color, children }) {
  return <span className={`badge badge-${color ?? 'yellow'}`}>{children}</span>
}