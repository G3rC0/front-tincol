# 🐝 Tienda Colmena — Frontend

Tienda online de ropa **streetwear/casual** construida con **React + Vite**.
Diseño Neo-Brutalism Pop, mobile-first.

> **Repositorio:** `colmena-frontend`
> **Backend (próximamente):** `colmena-backend` — Node.js + Express + Oracle

---

## 📁 Estructura de carpetas

```
tienda-colmena/
├── .env.example            ← Variables de entorno (copia a .env)
├── .gitignore
├── index.html              ← Punto de entrada HTML (Vite)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            ← Punto de entrada de React
    ├── App.jsx             ← Rutas (React Router) + Providers
    ├── index.css           ← Design system Neo-Brutalism (tokens CSS)
    │
    ├── data/
    │   └── products.js     ← Mock data de productos
    │                          ⚠️ Reemplazar por llamadas a la API cuando
    │                          el backend esté listo
    │
    ├── context/            ← Estado global (Context API)
    │   ├── AuthContext.jsx ← Sesión de usuario (login/registro/logout)
    │   └── CartContext.jsx ← Carrito de compras (persiste en localStorage)
    │
    ├── components/         ← Componentes reutilizables
    │   ├── Navbar.jsx          Barra de navegación responsive
    │   ├── Footer.jsx          Pie de página
    │   ├── ProductCard.jsx     Tarjeta de producto (catálogo y home)
    │   ├── FilterSidebar.jsx   Filtros: categoría / talla / precio
    │   ├── ImageCarousel.jsx   Carrusel de imágenes (página de detalle)
    │   ├── AuthModal.jsx       Modal "inicia sesión para añadir al carrito"
    │   └── SizePickerModal.jsx Modal selector de talla
    │
    ├── pages/              ← Una página = una ruta
    │   ├── HomePage.jsx        /              Hero + destacados + CTA
    │   ├── CatalogPage.jsx     /catalogo      Grid + filtros laterales
    │   ├── ProductDetailPage.jsx /producto/:id Carrusel + info + tallas
    │   ├── CartPage.jsx        /carrito       Lista ítems + resumen
    │   └── AuthPage.jsx        /auth          Login / Registro (tabs)
    │
    └── utils/              ← Funciones auxiliares reutilizables
        ├── formatPrice.js  ← formatPrice(89.9) → "Bs. 89.90"
        ├── validateEmail.js← Validación de formularios
        └── api.js          ← Cliente HTTP listo para conectar al backend
```

---

## 🚀 Instalación y arranque

### Requisitos
- Node.js **v18+**
- npm **v9+**

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/G3rC0/colmena-frontend.git
cd colmena-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env si ya tienes el backend corriendo

# 4. Correr en modo desarrollo
npm run dev
```

Abre **http://localhost:5173** en tu navegador.

---

## 📜 Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Genera build de producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## 🛣️ Rutas de la aplicación

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | HomePage | Hero, categorías, productos destacados |
| `/catalogo` | CatalogPage | Todos los productos con filtros |
| `/catalogo?cat=Hoodies` | CatalogPage | Filtrado por categoría desde URL |
| `/producto/:id` | ProductDetailPage | Detalle con carrusel y tallas |
| `/carrito` | CartPage | Carrito con resumen de orden |
| `/auth?mode=login` | AuthPage | Formulario de inicio de sesión |
| `/auth?mode=register` | AuthPage | Formulario de registro |

---

## 🔐 Flujo de autenticación

Actualmente la auth es **simulada con localStorage** (sin backend).
Los datos de usuarios se guardan en el navegador del usuario.

**Cuando el backend esté listo**, reemplaza las funciones `login()` y `register()`
en `src/context/AuthContext.jsx` por llamadas a tu API:

```js
// AuthContext.jsx — línea ~35
// CAMBIAR ESTO:
const found = users.find(u => u.email === email && u.password === password)

// POR ESTO:
const res  = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
const data = await res.json()
if (!res.ok) return { success: false, error: data.message }
localStorage.setItem('colmena_token', data.token)
setUser(data.user)
return { success: true }
```

---

## 🛒 Flujo del carrito

1. Usuario navega el catálogo **sin necesidad de login**
2. Click en **"Añadir"** → verifica si está logueado
   - ❌ No logueado → modal que pide login/registro
   - ✅ Logueado → modal selector de talla → ítem añadido
3. Click en **"Ver más"** → página de detalle → selecciona talla → añadir
4. El carrito persiste en `localStorage` hasta que el usuario lo vacía

---

## 🎨 Design System

Todos los tokens de diseño están en `src/index.css` como variables CSS:

| Token | Valor | Uso |
|-------|-------|-----|
| `--primary` | `#FFDE59` | Amarillo miel (color principal) |
| `--secondary` | `#FF6B6B` | Coral (ofertas, alertas) |
| `--green` | `#4ADE80` | Badges "Nuevo" |
| `--shadow-md` | `5px 5px 0px #121212` | Sombra Neo-Brutalism |
| `--font-display` | Space Grotesk | Títulos y botones |
| `--font-body` | Plus Jakarta Sans | Texto general |
| `--font-mono` | JetBrains Mono | Precios, badges, código |

---

## 🔌 Conexión con el Backend (roadmap)

Cuando construyas `colmena-backend`, los pasos para conectar son:

1. **Configura `.env`** con `VITE_API_URL=http://localhost:3000/api`
2. **Reemplaza `src/data/products.js`** — cambia el array hardcodeado por llamadas a `api.get('/productos')` desde `src/utils/api.js`
3. **Actualiza `AuthContext.jsx`** — conecta `login()` y `register()` a tus endpoints `/auth/login` y `/auth/register`
4. (Opcional) **Mueve el carrito al backend** — guarda los ítems en Oracle en vez de localStorage

---

## 📦 Dependencias principales

| Paquete | Versión | Para qué sirve |
|---------|---------|----------------|
| `react` | 18 | Framework UI |
| `react-router-dom` | 6 | Navegación entre páginas |
| `lucide-react` | 0.383 | Íconos SVG |
| `vite` | 5 | Bundler y dev server |

---

## 👨‍💻 Autor

**Gerson** — [@G3rC0](https://github.com/G3rC0)
Universidad Mayor de San Andrés (UMSA) — Informática
