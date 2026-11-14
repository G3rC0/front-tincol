/**
 * Button — envuelve las clases .btn del design system.
 * variant: primary | coral | green | purple | blue | white | dark
 * size:    sm | lg | (vacío = normal)
 */
export default function Button({
  variant = 'primary',
  size,
  full = false,
  className = '',
  type = 'button',   // evita que dentro de un <form> envíe sin querer
  children,
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size && `btn-${size}`,
    full && 'btn-full',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}