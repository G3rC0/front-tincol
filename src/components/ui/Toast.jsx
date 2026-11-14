/** Aviso flotante temporal. El padre decide cuándo montarlo/desmontarlo. */
export default function Toast({ children }) {
  return <div className="toast" role="status">{children}</div>
}