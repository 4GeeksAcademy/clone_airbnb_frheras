# Contexto del proyecto: Clon del frontend de Airbnb

## Objetivo
Reproducir el frontend de Airbnb con **Next.js (App Router)** y **Tailwind CSS**, con fines educativos. El foco está en la maquetación, la navegación entre vistas y la composición de componentes reutilizables. No incluye backend real: los datos son mock.

## Stack
- Next.js (App Router, `app/`)
- Tailwind CSS
- Datos mock locales (JSON o TypeScript) para habitaciones y categorías

---

## Vistas

### 1. Inicio — `/`
Página de entrada. Muestra la barra de búsqueda principal, las categorías de alojamiento (p. ej. "Casas en la playa", "Cabañas", "Habitaciones") y una cuadrícula destacada de alojamientos. Sirve como punto de partida hacia el catálogo.

### 2. Catálogo — `/catalog`
Listado de alojamientos disponibles. Incluye filtros (tipo de alojamiento, precio, número de huéspedes) y una cuadrícula de tarjetas. Cada tarjeta enlaza a la vista de detalle. Los filtros se reflejan en los parámetros de la URL (query string).

### 3. Detalle de habitación — `/rooms/[id]`
Ficha completa de un alojamiento: galería de fotos, título, ubicación, anfitrión, descripción, servicios incluidos, reseñas y un panel de reserva (fechas, huéspedes y precio estimado). `[id]` es el identificador dinámico del alojamiento en los datos mock.

---

## Componentes principales por vista

### Inicio (`/`)
| Componente | Responsabilidad |
|---|---|
| `Navbar` | Logo, barra de búsqueda compacta y menú de usuario. Presente en todas las vistas. |
| `SearchBar` | Campos de destino, fechas y huéspedes. Redirige a `/catalog` con parámetros. |
| `CategoryList` | Carrusel o fila de categorías con icono y etiqueta. |
| `RoomCard` | Tarjeta reutilizable: imagen, ubicación, precio por noche, valoración. |
| `RoomGrid` | Cuadrícula que renderiza una lista de `RoomCard`. |
| `Footer` | Enlaces informativos y legales. |

### Catálogo (`/catalog`)
| Componente | Responsabilidad |
|---|---|
| `Navbar` y `SearchBar` | Reutilizados desde Inicio. |
| `FilterBar` | Botones o selectores de tipo, precio y huéspedes. |
| `FilterModal` | Versión móvil de los filtros. |
| `ResultsHeader` | Número de resultados y orden (precio, valoración). |
| `RoomGrid` / `RoomCard` | Reutilizados desde Inicio. |
| `Pagination` | Navegación entre páginas de resultados. |
| `EmptyState` | Mensaje cuando no hay resultados para los filtros. |

### Detalle de habitación (`/rooms/[id]`)
| Componente | Responsabilidad |
|---|---|
| `Navbar` | Reutilizado. |
| `ImageGallery` | Galería principal con miniaturas y vista a pantalla completa. |
| `RoomHeader` | Título, ubicación, valoración y botones de compartir o guardar. |
| `HostInfo` | Datos y avatar del anfitrión. |
| `RoomDescription` | Descripción y detalles (habitaciones, camas, baños). |
| `AmenitiesList` | Lista de servicios con icono. |
| `ReviewsList` | Valoración media y reseñas individuales. |
| `BookingCard` | Panel sticky con fechas, huéspedes, desglose de precio y botón de reserva. |
| `LocationMap` | Mapa estático o placeholder de la ubicación. |
| `NotFound` | Estado cuando el `id` no existe en los datos mock. |

### Componentes compartidos
`Navbar`, `Footer`, `RoomCard`, `RoomGrid`, `Button`, `Rating`, `Icon`.

---

## Especificación de componentes — móvil (375px)

> Fuente: `docs/screenshots/` (`home.png`, `catalogo.png`, `rooms.png`). Referencia de estructura y layout; datos mock. Mobile-first; escritorio desde `md:` (768px).

### Estructura global
- `BottomNav`: barra fija inferior. Visible en `/` y `/catalog`; no aparece en `/rooms/[id]`.
- Cada vista tiene su propia cabecera; en móvil no se usa `Navbar` (ver decisiones abiertas).
- Padding inferior de página: `pb-20` con `BottomNav`, `pb-28` con `MobileBookingBar`.

### Vista Inicio (`/`)
Orden vertical: `SearchBarCompact` → `CategoryChips` → `ExperienceCarousel` → `RoomCarousel` (×N) → `BottomNav`.

**SearchBarCompact**
- Props: `placeholder?: string` (def. "Empieza a buscar"), `onClick: () => void`
- Layout: `sticky top-0 z-20 bg-white px-4 pt-3 pb-2`. Pastilla `h-14 w-full rounded-full border shadow-sm`, contenido centrado.

**CategoryChips**
- Props: `categories: Category[]`, `activeId: string`, `onSelect: (id: string) => void`
- `Category = { id: string; label: string; icon: string }`
- Layout: `flex gap-2 overflow-x-auto px-4 py-3`. Chip `h-10 shrink-0 rounded-full border px-4`; activo con borde y texto oscuros.

**SectionHeader**
- Props: `title: string`, `onSeeAll?: () => void`
- Layout: `flex items-center justify-between px-4`. Título `text-xl font-semibold`; botón circular de 32px con flecha a la derecha.

**ExperienceCarousel**
- Props: `title: string`, `items: ExperienceItem[]`
- `ExperienceItem = { id: string; label: string; imageUrl: string }`
- Layout: `SectionHeader` + `flex gap-3 overflow-x-auto snap-x px-4`. Cada item `w-[104px] shrink-0`: imagen `aspect-square rounded-2xl object-cover`, etiqueta `text-sm line-clamp-2`.

**RoomCarousel**
- Props: `title: string`, `rooms: Room[]`, `onSeeAll?: () => void`
- Layout: `SectionHeader` + `flex gap-4 overflow-x-auto snap-x px-4`. Cada `RoomCard variant="carousel"` con `w-[160px] shrink-0 snap-start`.

**RoomCard**
- Props: `room: Room`, `variant?: "carousel" | "list"` (def. "carousel"), `isFavorite?: boolean`, `onToggleFavorite?: (id: string) => void`, `onClick?: (id: string) => void`
- Layout carousel: columna `gap-2`. Imagen `relative aspect-square rounded-2xl overflow-hidden` con `Badge` (arriba-izq) y `FavoriteButton` (arriba-der). Debajo: título `font-semibold text-sm line-clamp-2`, subtítulo `text-xs text-gray-500`, fila de precio `text-xs` con valoración a la derecha.
- Layout list: `w-full`, imagen `aspect-[4/3]`, mismo texto con `text-base`.

**Badge**
- Props: `label: string`, `icon?: ReactNode`
- Layout: `absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold shadow`.

**FavoriteButton**
- Props: `active: boolean`, `onToggle: () => void`
- Layout: `absolute right-2 top-2 h-8 w-8`, icono de corazón (relleno si `active`).

**BottomNav**
- Props: `items: NavItem[]`, `activeId: string`
- `NavItem = { id: string; label: string; href: string; icon: ReactNode }`
- Layout: `fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-3 border-t bg-white`. Activo en color de acento.

### Vista Catálogo (`/catalog`)
Capas: `MapView` (fondo, `absolute inset-x-0 top-0 h-[48dvh]`) → `CatalogHeader` (`absolute top-3 z-10`) → `BottomSheet` (`absolute inset-x-0 top-[44dvh] bottom-16`) → `BottomNav`.

**CatalogHeader**
- Props: `title: string`, `subtitle?: string`, `activeFiltersCount?: number`, `onBack: () => void`, `onOpenFilters: () => void`
- Layout: `absolute inset-x-4 top-3 flex items-center gap-2`. Dos botones circulares de 40px (volver a la izquierda, filtros a la derecha) y una pastilla central `flex-1 h-14 rounded-full bg-white shadow` con título `text-sm font-semibold` y subtítulo `text-xs text-gray-500`. Contador sobre filtros si `activeFiltersCount > 0`.

**MapView**
- Props: `center: { lat: number; lng: number }`, `zoom?: number`, `markers: MapMarkerData[]`, `selectedId?: string`, `onMarkerClick: (id: string) => void`
- `MapMarkerData = { id: string; lat: number; lng: number; priceLabel: string }`
- Layout: `absolute inset-x-0 top-0 h-[48dvh]`. En MVP puede ser un mapa estático con marcadores posicionados.

**PriceMarker**
- Props: `label: string`, `active?: boolean`, `onClick?: () => void`
- Layout: `rounded-full bg-white px-2.5 py-1 text-sm font-semibold shadow`. Activo: `bg-gray-900 text-white`.

**BottomSheet**
- Props: `children: ReactNode`
- Layout: `absolute inset-x-0 top-[44dvh] bottom-16 overflow-y-auto rounded-t-3xl bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.1)]`. Asa superior `mx-auto mt-2 h-1 w-10 rounded-full bg-gray-300`. MVP sin gesto de arrastre.

**ResultsHeader**
- Props: `count: number`, `sortLabel?: string`, `onSortClick?: () => void`
- Layout: `px-4 py-4 text-center`. Título `text-lg font-semibold` ("Más de {count} alojamientos"); línea secundaria `text-xs text-gray-500` con `sortLabel`.

**RoomList**
- Props: `rooms: Room[]`, `favoriteIds: string[]`, `onToggleFavorite: (id: string) => void`, `onRoomClick: (id: string) => void`
- Layout: `flex flex-col gap-8 px-4 pb-6`, renderiza `RoomCard variant="list"`.

**FilterModal**
- Props: `open: boolean`, `filters: FilterState`, `onApply: (f: FilterState) => void`, `onReset: () => void`, `onClose: () => void`
- `FilterState = { type?: string; minPrice?: number; maxPrice?: number; guests?: number }`
- Layout: `fixed inset-0 z-50 flex flex-col bg-white`. Cabecera con cerrar y título "Filtros"; cuerpo con scroll por secciones; pie `sticky bottom-0 border-t p-4` con `Button` "Mostrar {n} alojamientos" y enlace "Limpiar".
- No aparece en las capturas; inferido de la tabla de catálogo.

**EmptyState**
- Props: `message: string`, `onReset?: () => void`
- Layout: `flex flex-col items-center gap-3 py-12 text-center`.

### Vista Detalle (`/rooms/[id]`)
Orden: `ImageGalleryMobile` (sangre completa) → bloque de contenido (`relative -mt-6 rounded-t-3xl bg-white px-4 pt-6`) con `RoomHeader`, `HostInfo`, lista de `HighlightItem`, `RoomDescription`, `AmenitiesList`, `ReviewsList`, `LocationMap` → `MobileBookingBar` fija.

**ImageGalleryMobile**
- Props: `images: string[]`, `alt: string`, `isFavorite: boolean`, `onBack: () => void`, `onShare?: () => void`, `onToggleFavorite: () => void`
- Layout: `relative flex h-[46dvh] w-full snap-x overflow-x-auto`. Cada imagen `w-full shrink-0 snap-center object-cover`. Overlay `absolute inset-x-4 top-4 flex justify-between` con dos `IconButton` a la izquierda (volver) y a la derecha (compartir, favorito). Contador `absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white` ("1 / N").

**IconButton**
- Props: `icon: ReactNode`, `label: string` (aria-label), `onClick: () => void`
- Layout: `flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow`.

**RoomHeader**
- Props: `title: string`, `propertyType: string`, `location: string`, `rating: number`, `reviewCount: number`
- Layout: `border-b py-6 text-center`. Título `text-2xl font-semibold` (máx. 2 líneas); tipo y ubicación `text-sm text-gray-500`; valoración `text-sm font-medium` con estrella.

**HostInfo**
- Props: `name: string`, `yearsExperience?: number`, `avatarUrl: string`
- Layout: `flex items-center gap-4 border-b py-6`. Avatar `h-14 w-14 rounded-full`; nombre `font-semibold`, detalle `text-sm text-gray-500`.

**HighlightItem**
- Props: `icon: ReactNode`, `title: string`, `description?: string`
- Layout: `flex gap-4 border-b py-6`. Icono de 32px a la izquierda, texto a la derecha.

**RoomDescription**
- Props: `text: string`, `maxLines?: number` (def. 4)
- Layout: `border-b py-6`. Texto `line-clamp-4` con botón "Mostrar más" que alterna.

**AmenitiesList / ReviewsList / LocationMap** (fuera del pliegue en las capturas; se mantienen de la tabla existente)
- `AmenitiesList`: props `amenities: { id: string; label: string; icon: ReactNode }[]`; layout `flex flex-col gap-4 py-6`.
- `ReviewsList`: props `reviews: Review[]`, `averageRating: number`; layout columna única.
- `LocationMap`: props `center: { lat: number; lng: number }`; layout `h-64 w-full rounded-2xl overflow-hidden`.

**MobileBookingBar**
- Props: `totalPrice: number`, `currency?: string` (def. "€"), `dateRange?: string`, `cancellationFree?: boolean`, `ctaLabel?: string` (def. "Reservar"), `onReserve: () => void`
- Layout: `fixed inset-x-0 bottom-0 z-40 border-t bg-white px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] shadow-[0_-2px_12px_rgba(0,0,0,0.08)]`. Fila 1: "Desde {totalPrice} {currency} en total" (precio subrayado) y `dateRange` en `text-xs`. Fila 2 opcional: chip "Cancelación gratuita". Fila 3: `Button` `w-full h-12 rounded-xl`.
- Sustituye a `BookingCard` en móvil; `BookingCard` queda para `md:`.

### Tipos (`types/room.ts`)
`Room` debe ampliarse con: `subtitle`, `propertyType`, `totalPrice?`, `dateRange?`, `reviewCount`, `badge?`, `images: string[]`, `lat`, `lng`. Los campos actuales (`id`, `title`, `location`, `pricePerNight`, `rating`, `imageUrl`) se mantienen.

### Decisiones abiertas
- **Navbar en móvil:** propongo sustituirla por `BottomNav` + cabeceras por vista. Cambia la tabla de componentes actual.
- **RoomGrid en móvil:** se usa `RoomCarousel` en Inicio y `RoomList` en Catálogo.
- **Pagination en móvil:** propuesta de botón "Cargar más" o scroll infinito; no aparece en las capturas.
- **Sin captura:** `FilterModal`, `EmptyState`, `AmenitiesList`, `ReviewsList` y `LocationMap` se especifican por inferencia.

---

## Perfil del usuario objetivo

**Perfil:** viajero individual o en pareja/familia de 25 a 45 años que planea una escapada o un viaje de trabajo. Usa el móvil y el ordenador con frecuencia y compara varias opciones antes de decidir.

**Meta:** encontrar un alojamiento adecuado a su destino, fechas, presupuesto y número de personas, y entender rápidamente si es una buena opción (precio, valoración, servicios, ubicación) para llegar a una reserva.

**Recorrido típico:**
1. Llega a `/` y busca un destino o explora categorías.
2. Pasa a `/catalog` y ajusta filtros para reducir opciones.
3. Abre `/rooms/[id]` para revisar fotos, reseñas y precio final.
4. Inicia la reserva desde el `BookingCard`.

---

## Convenciones
- Componentes en `components/`, agrupados por vista o como compartidos.
- Datos mock en `data/`.
- Estilos solo con clases de Tailwind; sin CSS global salvo para la base.
- Responsive: diseño móvil primero.
