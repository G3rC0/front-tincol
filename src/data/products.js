/**
 * MOCK DATA — Tienda Colmena
 * Cuando conectes tu backend Node/Express + Oracle, reemplaza este array
 * por una llamada: GET /api/productos  →  const data = await res.json()
 * La estructura de cada objeto debe mantenerse igual para que los componentes
 * no necesiten cambios.
 */
    
export const CATEGORIES = ['Todos', 'Camisetas', 'Hoodies', 'Pantalones', 'Accesorios']

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRICE_RANGES = [
  { label: 'Hasta Bs. 50',      min: 0,   max: 50 },
  { label: 'Bs. 50 – 100',      min: 50,  max: 100 },
  { label: 'Bs. 100 – 200',     min: 100, max: 200 },
  { label: 'Más de Bs. 200',    min: 200, max: Infinity },
]

// badge: 'Nuevo' | 'Oferta' | null
// badgeColor: 'green' | 'coral' | null
// images: array de URLs — primera imagen = portada de la tarjeta
export const products = [
  {
    id: 1,
    name: 'Hoodie Drop Negro',
    price: 89.90,
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Nuevo',
    badgeColor: 'green',
    featured: true,
    description:
      'Hoodie oversized de algodón premium 380GSM. Capucha doble capa, bolsillo canguro con detalle bordado en el pecho. Fit relajado pensado para el estilo urbano más auténtico. Interior afelpado para esos días fríos en la ciudad.',
    images: [
      'https://picsum.photos/seed/col1a/600/750',
      'https://picsum.photos/seed/col1b/600/750',
      'https://picsum.photos/seed/col1c/600/750',
    ],
  },
  {
    id: 2,
    name: 'Camiseta Graphic White',
    price: 45.00,
    category: 'Camisetas',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Oferta',
    badgeColor: 'coral',
    featured: true,
    description:
      'Camiseta de algodón peinado 200GSM con gráfico serigrafiado al frente. Cuello redondo reforzado, costuras dobles en mangas y dobladillo. La base perfecta para cualquier look.',
    images: [
      'https://picsum.photos/seed/col2a/600/750',
      'https://picsum.photos/seed/col2b/600/750',
      'https://picsum.photos/seed/col2c/600/750',
    ],
  },
  {
    id: 3,
    name: 'Jogger Urban Grey',
    price: 79.90,
    category: 'Pantalones',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: null,
    badgeColor: null,
    featured: false,
    description:
      'Jogger en french terry gris melange. Cintura elástica con cordón ajustable, bolsillos laterales y bolsillo trasero con cierre oculto. Cómodo para la calle o el gym.',
    images: [
      'https://picsum.photos/seed/col3a/600/750',
      'https://picsum.photos/seed/col3b/600/750',
      'https://picsum.photos/seed/col3c/600/750',
    ],
  },
  {
    id: 4,
    name: 'Cap Colmena Honey',
    price: 35.00,
    category: 'Accesorios',
    sizes: ['Único'],
    badge: 'Nuevo',
    badgeColor: 'green',
    featured: true,
    description:
      'Gorra 6 paneles con bordado en relieve del logo Colmena. Cierre trasero ajustable, visera curva pre-curvada. El accesorio que completa cualquier fit.',
    images: [
      'https://picsum.photos/seed/col4a/600/750',
      'https://picsum.photos/seed/col4b/600/750',
      'https://picsum.photos/seed/col4c/600/750',
    ],
  },
  {
    id: 5,
    name: 'Camiseta Oversized Beige',
    price: 55.00,
    category: 'Camisetas',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: null,
    badgeColor: null,
    featured: true,
    description:
      'Camiseta oversized en beige clásico. Hombros caídos, corte drop shoulder con dobladillo crudo. La pieza base definitiva — combina con todo y dura toda la temporada.',
    images: [
      'https://picsum.photos/seed/col5a/600/750',
      'https://picsum.photos/seed/col5b/600/750',
      'https://picsum.photos/seed/col5c/600/750',
    ],
  },
  {
    id: 6,
    name: 'Hoodie Zip Coral',
    price: 99.00,
    category: 'Hoodies',
    sizes: ['M', 'L', 'XL', 'XXL'],
    badge: 'Oferta',
    badgeColor: 'coral',
    featured: false,
    description:
      'Hoodie con cierre completo en coral vibrante. Interior afelpado cálido, bolsillos laterales con cierre. El statement piece de esta temporada. Atrévete al color.',
    images: [
      'https://picsum.photos/seed/col6a/600/750',
      'https://picsum.photos/seed/col6b/600/750',
      'https://picsum.photos/seed/col6c/600/750',
    ],
  },
  {
    id: 7,
    name: 'Cargo Pants Olive',
    price: 120.00,
    category: 'Pantalones',
    sizes: ['S', 'M', 'L'],
    badge: 'Nuevo',
    badgeColor: 'green',
    featured: false,
    description:
      'Cargo de 6 bolsillos en canvas olive washed. Fit relaxed con cintura ajustable y puños en las piernas. El pantalón más funcional del streetwear — bolsillos de verdad.',
    images: [
      'https://picsum.photos/seed/col7a/600/750',
      'https://picsum.photos/seed/col7b/600/750',
      'https://picsum.photos/seed/col7c/600/750',
    ],
  },
  {
    id: 8,
    name: 'Camiseta Striped Navy',
    price: 49.90,
    category: 'Camisetas',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: null,
    badgeColor: null,
    featured: false,
    description:
      'Camiseta marinera con rayas navy clásicas. Algodón peinado 220GSM, corte regular ligeramente holgado. Un clásico renovado con el toque urbano de Colmena.',
    images: [
      'https://picsum.photos/seed/col8a/600/750',
      'https://picsum.photos/seed/col8b/600/750',
      'https://picsum.photos/seed/col8c/600/750',
    ],
  },
  {
    id: 9,
    name: 'Bucket Hat Black',
    price: 40.00,
    category: 'Accesorios',
    sizes: ['Único'],
    badge: null,
    badgeColor: null,
    featured: false,
    description:
      'Bucket hat negro en sarga de algodón. Ala de 6cm, interior de malla transpirable. El accesorio más versátil de la temporada — funciona en cualquier estación.',
    images: [
      'https://picsum.photos/seed/col9a/600/750',
      'https://picsum.photos/seed/col9b/600/750',
      'https://picsum.photos/seed/col9c/600/750',
    ],
  },
  {
    id: 10,
    name: 'Crewneck Purple',
    price: 85.00,
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Nuevo',
    badgeColor: 'green',
    featured: false,
    description:
      'Crewneck en lila suave — el color de temporada. Interior afelpado cálido, puños y cintura en canalé elástico. El sweatshirt más versátil del catálogo Colmena.',
    images: [
      'https://picsum.photos/seed/col10a/600/750',
      'https://picsum.photos/seed/col10b/600/750',
      'https://picsum.photos/seed/col10c/600/750',
    ],
  },
  {
    id: 11,
    name: 'Shorts Street Camo',
    price: 65.00,
    category: 'Pantalones',
    sizes: ['S', 'M', 'L'],
    badge: 'Oferta',
    badgeColor: 'coral',
    featured: false,
    description:
      'Short cargo en estampado camuflaje urbano. Bolsillos laterales con solapa, largo mid-thigh. Perfecto para el verano en la ciudad o el skatepark.',
    images: [
      'https://picsum.photos/seed/col11a/600/750',
      'https://picsum.photos/seed/col11b/600/750',
      'https://picsum.photos/seed/col11c/600/750',
    ],
  },
  {
    id: 12,
    name: 'Mini Tote Bag Miel',
    price: 55.00,
    category: 'Accesorios',
    sizes: ['Único'],
    badge: 'Nuevo',
    badgeColor: 'green',
    featured: false,
    description:
      'Tote bag mini en lona lavada color miel. Asas cortas y correa larga incluida, capacidad para el día a día. Serigrafía Colmena en el frente.',
    images: [
      'https://picsum.photos/seed/col12a/600/750',
      'https://picsum.photos/seed/col12b/600/750',
      'https://picsum.photos/seed/col12c/600/750',
    ],
  },
]

/** Devuelve un producto por ID (simula GET /api/productos/:id) */
export const getProductById = (id) =>
  products.find((p) => p.id === Number(id)) || null

/** Devuelve productos destacados (simula GET /api/productos?featured=true) */
export const getFeaturedProducts = () => products.filter((p) => p.featured)
