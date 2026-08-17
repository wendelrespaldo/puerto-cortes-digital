/**
 * Gestión del Alcalde — Giancarlo Rodríguez
 *
 * Fuente: texto de avances de gestión municipal proporcionado por la
 * Municipalidad de Puerto Cortés. Cada registro conserva el significado
 * original; donde el texto fuente no da una cifra, fecha o beneficiario
 * exacto se usa "No especificado" en lugar de inventar el dato. Los
 * registros marcados con `possibleDuplicateOf` aparecen mencionados dos
 * veces en el texto fuente (una vez por sección) y no se eliminaron
 * automáticamente, solo se señalan.
 *
 * Todos los indicadores del dashboard (ver getDashboardStats) se calculan
 * a partir de este arreglo — ningún total está escrito a mano.
 */

import {
  HardHat,
  Droplets,
  Palmtree,
  Trophy,
  HeartHandshake,
  DoorOpen,
  type LucideIcon,
} from "lucide-react";

export type RecordCategory =
  | "vial"
  | "agua_salud"
  | "turismo_economico"
  | "deportivo_educativo"
  | "bienestar_social"
  | "puertas_abiertas";

export type RecordStatus =
  | "finalizado"
  | "en_ejecucion"
  | "en_proceso"
  | "en_licitacion"
  | "diseno_planificacion"
  | "aprobado"
  | "orden_inicio";

export type RecordType =
  | "obra"
  | "proyecto"
  | "gestion"
  | "evento"
  | "accion_social"
  | "inversion"
  | "gestion_institucional";

export type MayorRecord = {
  id: string;
  title: string;
  category: RecordCategory;
  subcategory: string;
  type: RecordType;
  community: string;
  status: RecordStatus;
  /** 0–100. `null` cuando el texto original no da un porcentaje explícito. */
  progress: number | null;
  /** Texto de inversión tal como aparece en la fuente. */
  investment: string;
  /** Valor numérico transcrito del texto (para sumas del dashboard); `null` si no hay cifra. */
  investmentAmount: number | null;
  date: string;
  description: string;
  beneficiaries: string;
  /** Arquitectura lista para contenido futuro — vacío hasta que se cargue material real. */
  image: string | null;
  photos: string[];
  videos: string[];
  documents: string[];
  coords: { x: number; y: number } | null;
  featured?: boolean;
  /** Id de otro registro con el que este podría ser el mismo proyecto mencionado dos veces en la fuente. */
  possibleDuplicateOf?: string;
};

export const NOT_SPECIFIED = "No especificado";

export const categoryMeta: Record<
  RecordCategory,
  { label: string; description: string; icon: LucideIcon; gradient: string }
> = {
  vial: {
    label: "Infraestructura vial y estructural",
    description: "Pavimentación, puentes, alumbrado y obra vial en todo el municipio.",
    icon: HardHat,
    gradient: "from-pc-green-700 to-pc-navy-900",
  },
  agua_salud: {
    label: "Agua, saneamiento y salud integral",
    description: "Drenaje pluvial, agua potable, manejo ambiental y salud pública.",
    icon: Droplets,
    gradient: "from-pc-blue-600 to-pc-navy-900",
  },
  turismo_economico: {
    label: "Turismo, educación y desarrollo económico",
    description: "Eventos, identidad porteña, turismo y economía local.",
    icon: Palmtree,
    gradient: "from-pc-amber-500 to-pc-coral-600",
  },
  deportivo_educativo: {
    label: "Infraestructura deportiva y educativa",
    description: "Canchas, graderías y mejoras a centros educativos.",
    icon: Trophy,
    gradient: "from-pc-coral-600 to-pc-navy-900",
  },
  bienestar_social: {
    label: "Bienestar social",
    description: "Programas sociales, participación ciudadana y convenios de impacto.",
    icon: HeartHandshake,
    gradient: "from-pc-green-500 to-pc-blue-700",
  },
  puertas_abiertas: {
    label: "Gobierno de puertas abiertas",
    description: "Atención ciudadana, patronatos, supervisión de obra y gestión institucional.",
    icon: DoorOpen,
    gradient: "from-pc-navy-800 to-pc-blue-900",
  },
};

export const statusMeta: Record<RecordStatus, { label: string; dot: string; badge: string }> = {
  finalizado: {
    label: "Finalizado",
    dot: "bg-pc-green-500",
    badge: "bg-pc-green-100 text-pc-green-800",
  },
  en_ejecucion: {
    label: "En ejecución",
    dot: "bg-pc-amber-500",
    badge: "bg-pc-amber-400/20 text-pc-amber-600",
  },
  en_proceso: {
    label: "En proceso",
    dot: "bg-pc-blue-400",
    badge: "bg-pc-blue-100 text-pc-blue-700",
  },
  en_licitacion: {
    label: "En licitación",
    dot: "bg-pc-coral-500",
    badge: "bg-pc-coral-400/15 text-pc-coral-700",
  },
  diseno_planificacion: {
    label: "Diseño/planificación",
    dot: "bg-pc-blue-300",
    badge: "bg-pc-blue-100 text-pc-blue-800",
  },
  aprobado: {
    label: "Aprobado",
    dot: "bg-pc-navy-700",
    badge: "bg-pc-navy-900/10 text-pc-navy-900",
  },
  orden_inicio: {
    label: "Orden de inicio",
    dot: "bg-pc-green-300",
    badge: "bg-pc-green-50 text-pc-green-700",
  },
};

/**
 * Colores sólidos para las gráficas del dashboard (barras), separados de los
 * degradados usados en tarjetas. Paleta categórica validada con
 * scripts/validate_palette.js (seis chequeos: banda de luminosidad, piso de
 * croma, separación CVD adjacente, piso de visión normal, contraste) — pasa
 * en modo claro y oscuro para el orden fijo de categorías de categoryMeta.
 */
export const categoryChartColor: Record<RecordCategory, string> = {
  vial: "#157a49",
  agua_salud: "#1699c7",
  turismo_economico: "#c93f20",
  deportivo_educativo: "#1f9459",
  bienestar_social: "#0e7aa8",
  puertas_abiertas: "#f2542d",
};

/** Mismos hex que los `dot` de statusMeta — un color de estado nunca va solo, siempre con ícono/etiqueta. */
export const statusChartColor: Record<RecordStatus, string> = {
  finalizado: "#1f9459",
  en_ejecucion: "#f0a93b",
  en_proceso: "#4fb8dc",
  en_licitacion: "#f2542d",
  diseno_planificacion: "#8fd4e9",
  aprobado: "#163449",
  orden_inicio: "#8ad4a8",
};

/** Orden narrativo de ciclo de vida del proyecto, no alfabético — de la idea a la entrega. */
export const statusLifecycleOrder: RecordStatus[] = [
  "diseno_planificacion",
  "en_licitacion",
  "aprobado",
  "orden_inicio",
  "en_proceso",
  "en_ejecucion",
  "finalizado",
];

export const typeMeta: Record<RecordType, { label: string }> = {
  obra: { label: "Obra" },
  proyecto: { label: "Proyecto" },
  gestion: { label: "Gestión" },
  evento: { label: "Evento" },
  accion_social: { label: "Acción social" },
  inversion: { label: "Inversión" },
  gestion_institucional: { label: "Gestión institucional" },
};

function r(
  partial: Omit<
    MayorRecord,
    "progress" | "investment" | "investmentAmount" | "date" | "beneficiaries" | "image" | "photos" | "videos" | "documents" | "coords"
  > &
    Partial<
      Pick<
        MayorRecord,
        "progress" | "investment" | "investmentAmount" | "date" | "beneficiaries" | "image" | "photos" | "videos" | "documents" | "coords"
      >
    >
): MayorRecord {
  return {
    progress: partial.status === "finalizado" ? 100 : null,
    investment: NOT_SPECIFIED,
    investmentAmount: null,
    date: NOT_SPECIFIED,
    beneficiaries: NOT_SPECIFIED,
    image: null,
    photos: [],
    videos: [],
    documents: [],
    coords: null,
    ...partial,
  };
}

export const records: MayorRecord[] = [
  // ───────────────────────── INFRAESTRUCTURA VIAL Y ESTRUCTURAL ─────────────────────────
  r({
    id: "v-el-faro",
    title: "Pavimentación con concreto hidráulico — Barrio El Faro (avenidas 9 a 12)",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Barrio El Faro",
    status: "finalizado",
    description:
      "Ya terminamos la pavimentación con concreto hidráulico en el histórico barrio El Faro, entre las avenidas 9 y 12, beneficiando a muchas familias.",
    featured: true,
  }),
  r({
    id: "v-banderas-3",
    title: "Pavimentación — Banderas 3",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Banderas 3",
    status: "finalizado",
    description: "Finalizamos también la pavimentación en la comunidad de Banderas 3.",
  }),
  r({
    id: "v-miraflores",
    title: "Pavimentación — Colonia Miraflores",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Colonia Miraflores",
    status: "finalizado",
    description: "Finalizamos la pavimentación de colonia Miraflores.",
  }),
  r({
    id: "v-7a-avenida",
    title: "Pavimentación — 7.ª Avenida",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "7.ª Avenida",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en el proyecto de pavimentación de la 7.ª Avenida.",
  }),
  r({
    id: "v-puente-bulichampa",
    title: "Puente vehicular — Bulichampa y Chameleconcito",
    category: "vial",
    subcategory: "Puentes y estructuras",
    type: "obra",
    community: "Bulichampa · Chameleconcito",
    status: "finalizado",
    description: "Finalizamos la construcción del nuevo puente vehicular entre Bulichampa y Chameleconcito.",
  }),
  r({
    id: "v-zapadril-arriba",
    title: "Pavimentación I etapa — Zapadril Arriba",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Zapadril Arriba",
    status: "en_ejecucion",
    investment: "Mayor a L 2,800,000.00",
    investmentAmount: 2800000,
    description:
      "Ya estamos construyendo nuevos frentes de pavimento. Iniciamos la primera etapa en Zapadril Arriba con 190 metros lineales de concreto e inversión mayor a los 2,8 millones de lempiras.",
  }),
  r({
    id: "v-nuevos-horizontes",
    title: "Pavimentación de calles internas — Colonia Nuevos Horizontes",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Colonia Nuevos Horizontes",
    status: "en_ejecucion",
    description: "También seguimos con la pavimentación de calles internas en la colonia Nuevos Horizontes.",
  }),
  r({
    id: "v-el-ocote",
    title: "Rampa de acceso con huellas de concreto — El Ocote",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "El Ocote",
    status: "orden_inicio",
    description: "Entregamos la orden de inicio para la rampa de acceso con huellas de concreto en la comunidad de El Ocote.",
  }),
  r({
    id: "v-la-roca-las-mercedes",
    title: "Pavimentación — La Roca hacia Las Mercedes",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "La Roca · Las Mercedes",
    status: "en_ejecucion",
    description:
      "Avanzamos con paso firme en la pavimentación de La Roca hacia Las Mercedes, junto a otros tramos del municipio.",
  }),
  r({
    id: "v-pueblo-nuevo-2da-calle",
    title: "Pavimentación — segunda calle, Barrio Pueblo Nuevo",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Barrio Pueblo Nuevo",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en la pavimentación de la segunda calle en barrio Pueblo Nuevo.",
  }),
  r({
    id: "v-san-antonio-la-roca",
    title: "Pavimentación — San Antonio La Roca",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "San Antonio La Roca",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en la pavimentación de San Antonio La Roca.",
  }),
  r({
    id: "v-san-juan-zapadril",
    title: "Pavimentación — San Juan Zapadril",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "San Juan Zapadril",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en la pavimentación de San Juan Zapadril.",
  }),
  r({
    id: "v-30-de-enero",
    title: "Pavimentación — Colonia 30 de Enero",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Colonia 30 de Enero",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en la pavimentación de la colonia 30 de enero.",
  }),
  r({
    id: "v-1ra-de-mayo",
    title: "Pavimentación — Colonia 1ra de Mayo",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Colonia 1ra de Mayo",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en la pavimentación de la colonia 1ra de Mayo.",
  }),
  r({
    id: "v-amigos-del-campo",
    title: "Pavimentación — Amigos del Campo",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Amigos del Campo",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en la pavimentación de Amigos del Campo.",
  }),
  r({
    id: "v-santa-clara-escuela-taller",
    title: "Pavimentación — entrada a la escuela taller, Santa Clara",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Santa Clara",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en la entrada hacia la escuela taller en Santa Clara.",
  }),
  r({
    id: "v-la-concordia",
    title: "Proyecto vial — La Concordia",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "La Concordia",
    status: "en_ejecucion",
    description: "Avanzamos con paso firme en el proyecto vial en La Concordia.",
  }),
  r({
    id: "v-nisperales",
    title: "Caja puente — Nisperales",
    category: "vial",
    subcategory: "Puentes y estructuras",
    type: "obra",
    community: "Nisperales",
    status: "en_proceso",
    description: "Fortalecemos el desarrollo comunitario con la construcción de la caja puente en Nisperales.",
  }),
  r({
    id: "v-lempira-alumbrado",
    title: "Alumbrado público — Colonia Lempira",
    category: "vial",
    subcategory: "Alumbrado y equipamiento urbano",
    type: "obra",
    community: "Colonia Lempira",
    status: "en_proceso",
    description: "Fortalecemos el desarrollo comunitario con la instalación de alumbrado público en la colonia Lempira.",
  }),
  r({
    id: "v-nola-escenario",
    title: "Escenario comunitario — Nola",
    category: "vial",
    subcategory: "Alumbrado y equipamiento urbano",
    type: "obra",
    community: "Nola",
    status: "en_proceso",
    description: "Fortalecemos el desarrollo comunitario con la construcción del escenario comunitario en Nola.",
  }),
  r({
    id: "v-rio-mar-pavimentacion",
    title: "Pavimentación con concreto hidráulico — Río Mar",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Río Mar",
    status: "en_ejecucion",
    description: "Continuamos el proyecto de pavimentación con concreto hidráulico en la comunidad de Río Mar.",
  }),
  r({
    id: "v-tumulos-velocidad",
    title: "Instalación de túmulos de velocidad",
    category: "vial",
    subcategory: "Alumbrado y equipamiento urbano",
    type: "obra",
    community: "Río Mar · Baracoa · El Porvenir · La Roca",
    status: "finalizado",
    description: "Ya completamos la instalación de túmulos de velocidad en Río Mar, Baracoa, El Porvenir y La Roca.",
  }),
  r({
    id: "v-terraza-rural",
    title: "Mantenimiento técnico y nivelación de terraza no pavimentada",
    category: "vial",
    subcategory: "Mantenimiento vial",
    type: "gestion",
    community: "Zonas rurales",
    status: "en_ejecucion",
    description: "Ejecutamos de forma continua el mantenimiento técnico y nivelación de la terraza no pavimentada en zonas rurales.",
  }),
  r({
    id: "v-ampliacion-vial-186m",
    title: "Ampliación presupuestaria histórica para el futuro vial",
    category: "vial",
    subcategory: "Licitación y diseño vial",
    type: "inversion",
    community: "Municipio de Puerto Cortés",
    status: "aprobado",
    investment: "Mayor a L 186,000,000.00",
    investmentAmount: 186000000,
    description:
      "El futuro vial ya fue aprobado en corporación municipal con una histórica ampliación presupuestaria de más de 186 millones de lempiras.",
    featured: true,
  }),
  r({
    id: "v-el-faro-12av-ii-etapa",
    title: "II etapa de pavimentación hacia playa El Faro — 12 avenida",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Playa El Faro · 12 avenida",
    status: "en_ejecucion",
    description:
      "Continuamos con la segunda etapa hacia playa El Faro en la 12 avenida, dentro de la ampliación vial aprobada por la Corporación Municipal.",
  }),
  r({
    id: "v-pueblo-nuevo-tramos",
    title: "Tramos de pavimentación — Barrio Pueblo Nuevo",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Barrio Pueblo Nuevo",
    status: "en_ejecucion",
    description: "Continuamos con tramos de pavimentación en barrio Pueblo Nuevo, dentro de la ampliación vial aprobada.",
  }),
  r({
    id: "v-baracoa-johnson",
    title: "Pavimentación — calle al campo de fútbol Baracoa Johnson",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Baracoa Johnson",
    status: "en_ejecucion",
    description: "Continuamos con la calle al campo de fútbol Baracoa Johnson, dentro de la ampliación vial aprobada.",
  }),
  r({
    id: "v-baracoa-pueblo-ferrocarril",
    title: "Pavimentación — tramo hacia Baracoa Pueblo (antigua línea del ferrocarril)",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Baracoa Pueblo",
    status: "en_ejecucion",
    description:
      "Continuamos con el tramo hacia Baracoa Pueblo por la antigua línea del ferrocarril, dentro de la ampliación vial aprobada.",
  }),
  r({
    id: "v-maravillas-puente-alto",
    title: "Pavimentación — Colonia Las Maravillas, Puente Alto",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Colonia Las Maravillas, Puente Alto",
    status: "en_ejecucion",
    description: "Sumamos a este esfuerzo vial la pavimentación en la colonia Las Maravillas de Puente Alto.",
  }),
  r({
    id: "v-sirenas-cienaguita",
    title: "Pavimentación — calle de las Sirenas, Cienaguita",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Cienaguita",
    status: "en_ejecucion",
    description: "Sumamos a este esfuerzo vial la pavimentación de la calle de las Sirenas en Cienaguita.",
  }),
  r({
    id: "v-19-de-mayo-empedrado",
    title: "Empedrado — Colonia 19 de Mayo",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Colonia 19 de Mayo",
    status: "en_ejecucion",
    description: "Sumamos a este esfuerzo vial el pavimento tipo empedrado en la colonia 19 de Mayo.",
  }),
  r({
    id: "v-manacas-palermo",
    title: "Empedrado — Callejón Las Manacas, Barrio Palermo",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Barrio Palermo",
    status: "en_ejecucion",
    description: "Sumamos a este esfuerzo vial el pavimento tipo empedrado en el callejón Las Manacas de barrio Palermo.",
  }),
  r({
    id: "v-camaguey",
    title: "Pavimentación — Barrio Camagüey",
    category: "vial",
    subcategory: "Pavimentación",
    type: "obra",
    community: "Barrio Camagüey",
    status: "finalizado",
    description: "Finalizamos la pavimentación de barrio Camagüey.",
  }),
  r({
    id: "v-puente-quirimaco",
    title: "Puente Quirimaco — Barrio San Ramón",
    category: "vial",
    subcategory: "Puentes y estructuras",
    type: "obra",
    community: "Barrio San Ramón",
    status: "finalizado",
    description: "Construimos además el puente Quirimaco del barrio San Ramón.",
  }),
  r({
    id: "v-puente-aereo-rio-arriba",
    title: "Puente aéreo — Río Arriba",
    category: "vial",
    subcategory: "Puentes y estructuras",
    type: "obra",
    community: "Río Arriba",
    status: "finalizado",
    description: "Construimos el puente aéreo en Río Arriba.",
  }),
  r({
    id: "v-puente-peatonal-la-presa",
    title: "Puente peatonal — Aldea La Presa (sector ecoturístico)",
    category: "vial",
    subcategory: "Puentes y estructuras",
    type: "obra",
    community: "Aldea La Presa",
    status: "finalizado",
    description: "Construimos el puente peatonal en la aldea La Presa, sector ecoturístico.",
  }),
  r({
    id: "v-puente-la-uva",
    title: "Puente — Comunidad La Uva",
    category: "vial",
    subcategory: "Puentes y estructuras",
    type: "obra",
    community: "La Uva",
    status: "en_ejecucion",
    description: "Seguimos avanzando en la construcción de un puente en la comunidad de La Uva.",
  }),
  r({
    id: "v-puente-hamaca-agua-caliente",
    title: "Puente Hamaca — Agua Caliente",
    category: "vial",
    subcategory: "Puentes y estructuras",
    type: "obra",
    community: "Agua Caliente",
    status: "en_ejecucion",
    description: "Seguimos avanzando en la construcción del puente Hamaca en Agua Caliente.",
  }),
  r({
    id: "v-cerco-cementerio-baracoa",
    title: "Cerco perimetral del cementerio — Baracoa Pueblo",
    category: "vial",
    subcategory: "Alumbrado y equipamiento urbano",
    type: "obra",
    community: "Baracoa Pueblo",
    status: "en_ejecucion",
    description: "Seguimos avanzando en el cerco perimetral del cementerio de Baracoa Pueblo.",
  }),
  r({
    id: "v-campo-rojo-1ra-avenida",
    title: "Pavimentación de 1 km — 1.ª avenida (13 calle a portón 3), Barrio Campo Rojo",
    category: "vial",
    subcategory: "Licitación y diseño vial",
    type: "obra",
    community: "Barrio Campo Rojo",
    status: "en_licitacion",
    description:
      "Iniciamos procesos de licitación pública para pavimentar un kilómetro de la primera avenida desde la 13 calle hasta el portón 3 en barrio Campo Rojo.",
  }),
  r({
    id: "v-15-calle-travesia",
    title: "Pavimentación — 15 calle hacia Travesía",
    category: "vial",
    subcategory: "Licitación y diseño vial",
    type: "obra",
    community: "Travesía",
    status: "en_licitacion",
    description: "Iniciamos procesos de licitación pública para la 15 calle hacia Travesía.",
  }),
  r({
    id: "v-los-mangos-6-9-avenida",
    title: "Construcción — 6.ª a 9.ª avenida, Barrio Los Mangos",
    category: "vial",
    subcategory: "Licitación y diseño vial",
    type: "obra",
    community: "Barrio Los Mangos",
    status: "en_licitacion",
    description: "Iniciamos procesos de licitación pública para la construcción de la 6 a 9 avenida en barrio Los Mangos.",
  }),
  r({
    id: "v-puente-las-delicias",
    title: "Puente — Comunidad Las Delicias",
    category: "vial",
    subcategory: "Licitación y diseño vial",
    type: "obra",
    community: "Las Delicias",
    status: "en_licitacion",
    description: "Iniciamos procesos de licitación pública para el puente en la comunidad de Las Delicias.",
  }),
  r({
    id: "v-centro-cultural",
    title: "Centro Cultural Municipal",
    category: "vial",
    subcategory: "Licitación y diseño vial",
    type: "proyecto",
    community: "Casco urbano",
    status: "en_ejecucion",
    description: "Avanzamos firmemente la construcción del Centro Cultural Municipal.",
    featured: true,
  }),
  r({
    id: "v-subestacion-bomberos",
    title: "Nueva subestación de bomberos — Colinas del Norte",
    category: "vial",
    subcategory: "Licitación y diseño vial",
    type: "obra",
    community: "Colinas del Norte",
    status: "en_licitacion",
    description: "Continúa el proceso de licitación para la nueva subestación de bomberos en Colinas del Norte.",
  }),
  r({
    id: "v-anillo-costero",
    title: "Concurso nacional de diseño — Anillo Costero",
    category: "vial",
    subcategory: "Licitación y diseño vial",
    type: "proyecto",
    community: "Costa de Puerto Cortés",
    status: "en_licitacion",
    description: "Lanzamos el concurso nacional para el diseño del anillo costero.",
    featured: true,
  }),

  // ───────────────────────── AGUA, SANEAMIENTO Y SALUD INTEGRAL ─────────────────────────
  r({
    id: "a-canales-suyapa",
    title: "Canales pluviales de concreto (1,200 m lineales) — Barrio Suyapa",
    category: "agua_salud",
    subcategory: "Drenaje pluvial",
    type: "obra",
    community: "Barrio Suyapa",
    status: "finalizado",
    description: "Inauguramos 1200 metros lineales de canales pluviales de concreto en el barrio Suyapa.",
  }),
  r({
    id: "a-canales-campo-verde",
    title: "Canales pluviales I etapa — Campo Verde",
    category: "agua_salud",
    subcategory: "Drenaje pluvial",
    type: "obra",
    community: "Campo Verde",
    status: "finalizado",
    description: "Finalizamos la primera etapa de canales en Campo Verde, para salvaguardar a cada uno de sus vecinos.",
  }),
  r({
    id: "a-canales-campo-rojo-americana",
    title: "Canales pluviales II etapa — Zona Americana, Barrio Campo Rojo",
    category: "agua_salud",
    subcategory: "Drenaje pluvial",
    type: "obra",
    community: "Zona Americana, Barrio Campo Rojo",
    status: "finalizado",
    description: "Finalizamos la segunda etapa de canales en la zona americana de barrio Campo Rojo, para salvaguardar a cada uno de sus vecinos.",
  }),
  r({
    id: "a-losas-canales-san-ramon",
    title: "Fundición de losas y canales — 6.ª calle, Barrio San Ramón",
    category: "agua_salud",
    subcategory: "Drenaje pluvial",
    type: "obra",
    community: "Barrio San Ramón",
    status: "en_ejecucion",
    description: "Ya estamos construyendo a paso acelerado la fundición de losas y canales en la 6.ª calle de barrio San Ramón.",
  }),
  r({
    id: "a-colinas-norte-canales",
    title: "Pavimentación y canales pluviales — Colinas del Norte",
    category: "agua_salud",
    subcategory: "Drenaje pluvial",
    type: "obra",
    community: "Colinas del Norte",
    status: "en_ejecucion",
    description: "Ya estamos construyendo a paso acelerado la pavimentación y canales pluviales en Colinas del Norte.",
  }),
  r({
    id: "a-los-mangos-bases-licitacion",
    title: "Bases de licitación — 2.ª calle oeste, Barrio Los Mangos",
    category: "agua_salud",
    subcategory: "Drenaje pluvial",
    type: "obra",
    community: "Barrio Los Mangos",
    status: "en_licitacion",
    description: "Avanzamos las bases de licitación para la segunda calle oeste en barrio Los Mangos.",
  }),
  r({
    id: "a-tanque-nueva-ticamaya",
    title: "Instalación de tanque de agua — Nueva Ticamaya",
    category: "agua_salud",
    subcategory: "Agua potable",
    type: "obra",
    community: "Nueva Ticamaya",
    status: "en_ejecucion",
    description: "Ya estamos construyendo a paso acelerado la instalación del tanque de agua en Nueva Ticamaya.",
  }),
  r({
    id: "a-canales-los-cruces-baracoa",
    title: "Canales pluviales — Los Cruces, Baracoa",
    category: "agua_salud",
    subcategory: "Drenaje pluvial",
    type: "obra",
    community: "Los Cruces, Baracoa",
    status: "en_ejecucion",
    description: "Continuamos con los canales en Los Cruces en Baracoa.",
  }),
  r({
    id: "a-recoleccion-desechos",
    title: "Ampliación de rutas de recolección de desechos sólidos (rutas 1 a 11)",
    category: "agua_salud",
    subcategory: "Manejo de desechos y ambiente",
    type: "gestion",
    community: "Casco urbano",
    status: "finalizado",
    description: "Ya completamos la ampliación de las recolecciones de desechos sólidos de las rutas de la uno a la 11.",
  }),
  r({
    id: "a-limpieza-tragantes",
    title: "Limpieza masiva, dragado y desobstrucción de tragantes",
    category: "agua_salud",
    subcategory: "Manejo de desechos y ambiente",
    type: "gestion",
    community: "Casco urbano",
    status: "en_ejecucion",
    description: "Iniciamos la limpieza masiva, dragado y desobstrucción de tragantes en todo el casco urbano.",
  }),
  r({
    id: "a-limpieza-playas",
    title: "Cuadrillas permanentes de limpieza de playas",
    category: "agua_salud",
    subcategory: "Manejo de desechos y ambiente",
    type: "gestion",
    community: "Travesía · El Porvenir · Majerada",
    status: "en_ejecucion",
    description: "Con cuadrillas permanentes para limpieza de playas en Travesía, El Porvenir y Majerada.",
  }),
  r({
    id: "a-vivero-tulian",
    title: "Vivero forestal I etapa — Cuenca del Río Tulián",
    category: "agua_salud",
    subcategory: "Manejo de desechos y ambiente",
    type: "proyecto",
    community: "Río Tulián",
    status: "finalizado",
    description: "Inauguramos la primera etapa del vivero forestal en la cuenca del río Tulián.",
    featured: true,
  }),
  r({
    id: "a-cebasica-miguel-paz-travesia",
    title: "Remodelación y reparación — Centro de Educación Básica Miguel Paz Barahona",
    category: "agua_salud",
    subcategory: "Salud pública",
    type: "obra",
    community: "Travesía",
    status: "orden_inicio",
    description:
      "Realizamos la orden de inicio para la remodelación y reparación del Centro de Educación Básica Miguel Paz Barahona en la comunidad de Travesía.",
  }),
  r({
    id: "a-donacion-cripco",
    title: "Donación social a CRIPCO para rehabilitaciones gratuitas",
    category: "agua_salud",
    subcategory: "Salud pública",
    type: "accion_social",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    investment: "L 3,000,000.00",
    investmentAmount: 3000000,
    beneficiaries: "CRIPCO — rehabilitaciones gratuitas",
    description: "Entregamos una valiosa donación social de 3 millones de lempiras a CRIPCO para rehabilitaciones gratuitas.",
  }),
  r({
    id: "a-jornadas-vacunacion",
    title: "Jornadas del escudo epidemiológico — vacunación",
    category: "agua_salud",
    subcategory: "Salud pública",
    type: "accion_social",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    beneficiaries: "Niños y adultos mayores",
    description: "Ejecutamos jornadas masivas del escudo epidemiológico con vacunación para niños y adultos mayores.",
  }),

  // ───────────────────── TURISMO, EDUCACIÓN Y DESARROLLO ECONÓMICO ─────────────────────
  r({
    id: "t-festival-pescado",
    title: "Festival del Pescado — Aniversario del municipio",
    category: "turismo_economico",
    subcategory: "Eventos y cultura",
    type: "evento",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Celebramos a lo grande el aniversario del municipio con el Festival del Pescado.",
  }),
  r({
    id: "t-reconocimiento-deportistas",
    title: "Reconocimiento a deportistas y ciudadanos distinguidos 2026",
    category: "turismo_economico",
    subcategory: "Eventos y cultura",
    type: "evento",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Realizamos el justo reconocimiento a nuestros deportistas y ciudadanos distinguidos 2026.",
  }),
  r({
    id: "t-semana-santa",
    title: "Semana Santa histórica",
    category: "turismo_economico",
    subcategory: "Eventos y cultura",
    type: "evento",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    beneficiaries: "Más de 1,500,000 visitantes",
    description: "Ya terminamos una Semana Santa histórica con el ingreso de más de 1,5 millones de visitantes.",
  }),
  r({
    id: "t-concierto-chaval-bachata",
    title: "Concierto internacional gratuito — El Chaval de la Bachata",
    category: "turismo_economico",
    subcategory: "Eventos y cultura",
    type: "evento",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Organizamos eventos masivos, el concierto internacional gratuito de El Chaval de la Bachata.",
  }),
  r({
    id: "t-concierto-los-galos",
    title: "Concierto con Los Galos — Día de la Madre porteña",
    category: "turismo_economico",
    subcategory: "Eventos y cultura",
    type: "evento",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Un exitoso concierto con Los Galos conmemorando el Día de la Madre porteña.",
  }),
  r({
    id: "t-feria-agostina-2026",
    title: "Lanzamiento oficial — Feria Agostina 2026",
    category: "turismo_economico",
    subcategory: "Eventos y cultura",
    type: "evento",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Finalizamos con el lanzamiento oficial de la Feria Agostina 2026, sumadas a muchas actividades conjuntas.",
  }),
  r({
    id: "t-sendero-laguna",
    title: "Sendero de la Laguna",
    category: "turismo_economico",
    subcategory: "Turismo y espacios públicos",
    type: "proyecto",
    community: "Laguna de Alvarado",
    status: "en_ejecucion",
    progress: 90,
    description:
      "El sendero de la Laguna avanza a pasos gigantes, registrando un 95 % en hincado de pilotes y 90 % en descabezado.",
    featured: true,
  }),
  r({
    id: "t-diseno-acuario",
    title: "Diseño — Acuario municipal, la Península",
    category: "turismo_economico",
    subcategory: "Turismo y espacios públicos",
    type: "proyecto",
    community: "La Península",
    status: "aprobado",
    description: "Ya se aprobó el diseño del nuevo e imponente acuario municipal en la península.",
    featured: true,
  }),
  r({
    id: "t-diseno-muelle",
    title: "Diseño — Muelle, Barrio El Porvenir",
    category: "turismo_economico",
    subcategory: "Turismo y espacios públicos",
    type: "proyecto",
    community: "Barrio El Porvenir",
    status: "aprobado",
    description: "Ya se aprobó el diseño del muelle en el barrio El Porvenir.",
  }),
  r({
    id: "t-diseno-mercado",
    title: "Diseño — Nuevo mercado de dos plantas con vista a la laguna, El Porvenir",
    category: "turismo_economico",
    subcategory: "Turismo y espacios públicos",
    type: "proyecto",
    community: "Barrio El Porvenir",
    status: "aprobado",
    description: "Ya se aprobó el diseño del nuevo mercado de dos plantas con vista a la laguna en El Porvenir.",
  }),
  r({
    id: "t-parque-infantil-el-porvenir",
    title: "Parque infantil, chapoteadero y parador fotográfico — Barrio El Porvenir",
    category: "turismo_economico",
    subcategory: "Turismo y espacios públicos",
    type: "obra",
    community: "Barrio El Porvenir",
    status: "finalizado",
    description:
      "Inauguramos el complejo de parque infantil, chapoteadero en playa municipal y parador fotográfico en barrio El Porvenir.",
  }),
  r({
    id: "t-parque-infantil-cienaguita",
    title: "Parque infantil — Playa Cienaguita",
    category: "turismo_economico",
    subcategory: "Turismo y espacios públicos",
    type: "obra",
    community: "Playa Cienaguita",
    status: "orden_inicio",
    description: "Ya dimos la primera palada para el parque infantil en playa Cienaguita.",
  }),
  r({
    id: "t-plaza-emprendedor",
    title: "Plaza del emprendedor — Barrio La Curva",
    category: "turismo_economico",
    subcategory: "Desarrollo económico",
    type: "obra",
    community: "Barrio La Curva",
    status: "en_ejecucion",
    description: "Impulsamos la economía local con la construcción de la plaza del emprendedor en barrio La Curva.",
  }),

  // ───────────────────── INFRAESTRUCTURA DEPORTIVA Y EDUCATIVA ─────────────────────
  r({
    id: "d-estadio-excelsior-iluminacion",
    title: "Licitación de iluminación — Estadio Excelsior",
    category: "deportivo_educativo",
    subcategory: "Infraestructura deportiva",
    type: "obra",
    community: "Estadio Excelsior",
    status: "en_licitacion",
    description: "Iniciamos la licitación de iluminación para el estadio Excelsior.",
    featured: true,
  }),
  r({
    id: "d-estadio-excelsior-grama",
    title: "Nivelación técnica de grama natural — Estadio Excelsior",
    category: "deportivo_educativo",
    subcategory: "Infraestructura deportiva",
    type: "obra",
    community: "Estadio Excelsior",
    status: "en_ejecucion",
    progress: 40,
    description: "Avanzamos al 40 % en la nivelación técnica de la grama natural del estadio Excelsior.",
  }),
  r({
    id: "d-san-isidro-electrico",
    title: "Mejoramiento del sistema eléctrico — Cancha de fútbol, Barrio San Isidro",
    category: "deportivo_educativo",
    subcategory: "Infraestructura deportiva",
    type: "obra",
    community: "Barrio San Isidro",
    status: "en_proceso",
    description: "Fortalecemos el deporte local con el mejoramiento del sistema eléctrico de la cancha de fútbol en barrio San Isidro.",
  }),
  r({
    id: "d-suyapa-graderia",
    title: "Gradería — Complejo deportivo municipal, Barrio Suyapa",
    category: "deportivo_educativo",
    subcategory: "Infraestructura deportiva",
    type: "obra",
    community: "Barrio Suyapa",
    status: "en_proceso",
    description: "Fortalecemos el deporte local con la construcción de gradería en el complejo deportivo municipal de barrio Suyapa.",
  }),
  r({
    id: "d-manacalito-graderias",
    title: "Graderías — Cancha de fútbol, Manacalito",
    category: "deportivo_educativo",
    subcategory: "Infraestructura deportiva",
    type: "obra",
    community: "Manacalito",
    status: "en_proceso",
    description: "Fortalecemos el deporte local con graderías en la cancha de fútbol de Manacalito.",
  }),
  r({
    id: "d-mango-caoba-graderias",
    title: "Graderías y techo — Cancha El Mango Caoba",
    category: "deportivo_educativo",
    subcategory: "Infraestructura deportiva",
    type: "obra",
    community: "El Mango Caoba",
    status: "en_proceso",
    description: "Fortalecemos el deporte local con graderías y techo en la cancha de El Mango Caoba.",
  }),
  r({
    id: "d-remolino-ticamaya-graderia",
    title: "Gradería techada — Remolino Ticamaya",
    category: "deportivo_educativo",
    subcategory: "Infraestructura deportiva",
    type: "obra",
    community: "Remolino Ticamaya",
    status: "en_proceso",
    description: "Fortalecemos el deporte local con la construcción de gradería techada en Remolino Ticamaya.",
    possibleDuplicateOf: "b-remolino-ticamaya-graderias",
  }),
  r({
    id: "d-campo-calan-graderia",
    title: "Reparación de gradería y techo — Campo Calán",
    category: "deportivo_educativo",
    subcategory: "Infraestructura deportiva",
    type: "obra",
    community: "Campo Calán",
    status: "en_proceso",
    description: "Fortalecemos el deporte local con la reparación de gradería y techo en Campo Calán.",
  }),
  r({
    id: "d-ramon-amaya-amador",
    title: "Techado metálico y cancha multiusos — Escuela Ramón Amaya Amador",
    category: "deportivo_educativo",
    subcategory: "Infraestructura educativa",
    type: "obra",
    community: "Las Palmas",
    status: "finalizado",
    description: "En el sector educativo, finalizamos el techado metálico y cancha multiusos de la escuela Ramón Amaya Amador en Las Palmas.",
  }),
  r({
    id: "d-manuel-bonilla-saboy",
    title: "Cerco perimetral — Escuela Manuel Bonilla",
    category: "deportivo_educativo",
    subcategory: "Infraestructura educativa",
    type: "obra",
    community: "Saboy",
    status: "finalizado",
    description: "Construimos el cerco perimetral en la escuela Manuel Bonilla de Saboy.",
  }),
  r({
    id: "d-aulas-robles",
    title: "Construcción de aulas — Comunidad de Robles",
    category: "deportivo_educativo",
    subcategory: "Infraestructura educativa",
    type: "obra",
    community: "Robles",
    status: "finalizado",
    description: "Construcción de aulas en la comunidad de Robles.",
  }),
  r({
    id: "d-rodas-alvarado-la-uva",
    title: "Remodelación — Escuela Rodas Alvarado",
    category: "deportivo_educativo",
    subcategory: "Infraestructura educativa",
    type: "obra",
    community: "La Uva",
    status: "finalizado",
    description: "Remodelación de la Escuela Rodas Alvarado, comunidad La Uva.",
  }),
  r({
    id: "d-escuela-mexico",
    title: "Reparación — Escuela México",
    category: "deportivo_educativo",
    subcategory: "Infraestructura educativa",
    type: "obra",
    community: "No especificado",
    status: "en_ejecucion",
    description: "Seguimos avanzando en la reparación de la escuela México.",
  }),
  r({
    id: "d-pupitres-color-run",
    title: "Entrega de 200 pupitres nuevos — Centros prebásicos",
    category: "deportivo_educativo",
    subcategory: "Infraestructura educativa",
    type: "accion_social",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    beneficiaries: "200 pupitres — centros prebásicos, financiados por la Color Run",
    description: "Entregamos 200 pupitres nuevos a centros prebásicos financiados por la Color Run.",
  }),
  r({
    id: "d-educacion-ambiental",
    title: "Insumos de educación ambiental — Escuelas rurales y urbanas",
    category: "deportivo_educativo",
    subcategory: "Infraestructura educativa",
    type: "accion_social",
    community: "Escuelas rurales y urbanas",
    status: "finalizado",
    description: "Sumado a insumos de educación ambiental en escuelas rurales y urbanas.",
  }),

  // ───────────────────────── BIENESTAR SOCIAL ─────────────────────────
  r({
    id: "b-capital-semilla",
    title: "Entrega de capital semilla y materiales — Emprendedores locales",
    category: "bienestar_social",
    subcategory: "Emprendimiento y empleo",
    type: "accion_social",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Entregamos insumos de capital semilla y materiales a emprendedores locales.",
  }),
  r({
    id: "b-mesas-banadesa",
    title: "Mesas de trabajo con Banadesa — Créditos para productoras",
    category: "bienestar_social",
    subcategory: "Emprendimiento y empleo",
    type: "gestion_institucional",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Concretamos mesas de trabajo con Banadesa para créditos a productoras.",
  }),
  r({
    id: "b-alianza-alorica",
    title: "Alianza con Alorica — Empleo bilingüe para la juventud",
    category: "bienestar_social",
    subcategory: "Emprendimiento y empleo",
    type: "gestion_institucional",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Cerramos alianzas con Alorica para generar plazas de empleo bilingüe para la juventud.",
  }),
  r({
    id: "b-bonos-ramal-lima",
    title: "Entrega de más de 400 bonos alimenticios — Adultos mayores, Ramal de Lima",
    category: "bienestar_social",
    subcategory: "Asistencia social",
    type: "accion_social",
    community: "Ramal de Lima · Manacalito · Saboy · Ticamaya",
    status: "finalizado",
    beneficiaries: "Más de 400 bonos alimenticios directos a adultos mayores, en 15 comunidades vulnerables",
    description:
      "Ya completamos la entrega de más de 400 bonos alimenticios directos a adultos mayores en el ramal de Lima, cubriendo 15 comunidades vulnerables como Manacalito, Saboy y Ticamaya.",
  }),
  r({
    id: "b-viveres-varias-comunidades",
    title: "Distribución de raciones de víveres",
    category: "bienestar_social",
    subcategory: "Asistencia social",
    type: "accion_social",
    community: "Robles · Cedros · El Sauce · Saraguaina · La Barra",
    status: "finalizado",
    description: "En paralelo, distribuimos masivamente raciones de víveres en Robles, Cedros, El Sauce, Saraguaina y La Barra.",
  }),
  r({
    id: "b-eleccion-patronatos",
    title: "Elección de 135 patronatos — Todo el municipio",
    category: "bienestar_social",
    subcategory: "Participación ciudadana",
    type: "gestion_institucional",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    beneficiaries: "135 patronatos electos",
    description: "Promoviendo la participación ciudadana, logramos con éxito la histórica elección de 135 patronatos en todo el ámbito municipal.",
    featured: true,
  }),
  r({
    id: "b-centro-social-lopez-bonilla",
    title: "Centro social climatizado — Colonia López Bonilla, Baracoa",
    category: "bienestar_social",
    subcategory: "Infraestructura comunitaria",
    type: "obra",
    community: "Colonia López Bonilla, Baracoa",
    status: "finalizado",
    description: "Completamos y equipamos el moderno centro social climatizado en la colonia López Bonilla de Baracoa.",
  }),
  r({
    id: "b-centro-social-las-mercedes",
    title: "Reparación — Centro social, Colonia Las Mercedes",
    category: "bienestar_social",
    subcategory: "Infraestructura comunitaria",
    type: "obra",
    community: "Colonia Las Mercedes",
    status: "finalizado",
    description: "Reparamos el centro social de la colonia Las Mercedes.",
  }),
  r({
    id: "b-centro-comunal-la-esperanza",
    title: "Remodelación total — Centro comunal La Esperanza",
    category: "bienestar_social",
    subcategory: "Infraestructura comunitaria",
    type: "obra",
    community: "La Esperanza",
    status: "en_ejecucion",
    description: "Iniciamos la remodelación total del centro comunal La Esperanza para beneficio de muchas familias del sector.",
  }),
  r({
    id: "b-centro-social-9-diciembre",
    title: "Centro Social — Colonia 9 de Diciembre",
    category: "bienestar_social",
    subcategory: "Infraestructura comunitaria",
    type: "obra",
    community: "Colonia 9 de Diciembre",
    status: "finalizado",
    description: "Inauguramos el Centro Social Colonia 9 de Diciembre.",
  }),
  r({
    id: "b-cancha-la-esperanza-nuevos-horizontes",
    title: "Cancha multiusos — La Esperanza, Nuevos Horizontes",
    category: "bienestar_social",
    subcategory: "Infraestructura comunitaria",
    type: "obra",
    community: "La Esperanza, Nuevos Horizontes",
    status: "finalizado",
    description: "También inauguramos la cancha multiusos en el mismo sector de La Esperanza en Nuevos Horizontes.",
  }),
  r({
    id: "b-cancha-la-curva",
    title: "Cancha multiusos — La Curva",
    category: "bienestar_social",
    subcategory: "Infraestructura comunitaria",
    type: "obra",
    community: "La Curva",
    status: "en_ejecucion",
    description: "Continuamos con la cancha multiusos de la Curva.",
  }),
  r({
    id: "b-remolino-ticamaya-graderias",
    title: "Graderías techadas — Cancha de Remolino Ticamaya",
    category: "bienestar_social",
    subcategory: "Infraestructura comunitaria",
    type: "obra",
    community: "Remolino Ticamaya",
    status: "finalizado",
    description: "Inauguramos graderías techadas en la cancha de Remolino Ticamaya.",
    possibleDuplicateOf: "d-remolino-ticamaya-graderia",
  }),
  r({
    id: "b-modulos-banos-medina",
    title: "Módulos de baños con graderías — Medina",
    category: "bienestar_social",
    subcategory: "Infraestructura comunitaria",
    type: "obra",
    community: "Medina",
    status: "finalizado",
    description: "Inauguramos módulos de baños con graderías en Medina.",
  }),
  r({
    id: "b-apoyo-sector-religioso",
    title: "Apoyo institucional — Iglesia Católica, Pastores Evangélicos e Instituto Luis Braille",
    category: "bienestar_social",
    subcategory: "Apoyo institucional y convenios",
    type: "gestion_institucional",
    community: "Municipio de Puerto Cortés",
    status: "en_ejecucion",
    description:
      "Brindamos un fuerte respaldo al sector social mediante el apoyo constante a la Iglesia Católica, Asociación de Pastores Evangélicos y al Instituto Luis Braille.",
  }),
  r({
    id: "b-apoyo-adultos-mayores",
    title: "Apoyo continuo a adultos mayores — Medicamentos y exámenes gratuitos",
    category: "bienestar_social",
    subcategory: "Asistencia social",
    type: "accion_social",
    community: "Municipio de Puerto Cortés",
    status: "en_ejecucion",
    description: "Continuamos apoyando a nuestros adultos mayores con medicamentos y exámenes gratuitos.",
  }),
  r({
    id: "b-becas-maestros-convenios",
    title: "Programas de becas, pago de maestros y convenios educativos",
    category: "bienestar_social",
    subcategory: "Apoyo institucional y convenios",
    type: "gestion_institucional",
    community: "Municipio de Puerto Cortés",
    status: "en_ejecucion",
    description: "Fortaleciendo los programas de becas, garantizando el pago de maestros y promoviendo convenios que impulsan la educación.",
  }),
  r({
    id: "b-convenio-cepudo",
    title: "Convenio estratégico con CEPUDO",
    category: "bienestar_social",
    subcategory: "Apoyo institucional y convenios",
    type: "gestion_institucional",
    community: "Municipio de Puerto Cortés",
    status: "aprobado",
    beneficiaries: "Viviendas comunitarias y escuelas de manejo",
    description: "Firmamos un convenio estratégico con CEPUDO para la construcción de viviendas comunitarias y escuelas de manejo.",
    featured: true,
  }),

  // ───────────────────────── GOBIERNO DE PUERTAS ABIERTAS ─────────────────────────
  r({
    id: "p-atencion-ciudadana",
    title: "Atención al ciudadano — miércoles de por medio, desde las 6:00 a.m.",
    category: "puertas_abiertas",
    subcategory: "Atención ciudadana",
    type: "gestion_institucional",
    community: "Municipio de Puerto Cortés",
    status: "finalizado",
    description: "Consolidando un gobierno de puertas abiertas, implementamos con éxito la atención al ciudadano los días miércoles de por medio desde las 6 de la mañana.",
  }),
  r({
    id: "p-reuniones-patronatos",
    title: "Reuniones sectoriales con patronatos del municipio",
    category: "puertas_abiertas",
    subcategory: "Relación con patronatos",
    type: "gestion_institucional",
    community: "Municipio de Puerto Cortés",
    status: "en_ejecucion",
    description: "Mantenemos una comunicación activa a través de constantes reuniones sectoriales con los patronatos del municipio.",
  }),
  r({
    id: "p-supervision-obras",
    title: "Supervisión directa de obras y proyectos por el alcalde",
    category: "puertas_abiertas",
    subcategory: "Supervisión de obra",
    type: "gestion",
    community: "Municipio de Puerto Cortés",
    status: "en_ejecucion",
    description: "Nuestro alcalde continúa supervisando de cerca las obras y proyectos que impulsan el desarrollo de Puerto Cortés.",
  }),
  r({
    id: "p-transferencia-autorizada",
    title: "Autorización de transferencia presupuestaria para nueva cartera de proyectos",
    category: "puertas_abiertas",
    subcategory: "Supervisión de obra",
    type: "inversion",
    community: "Municipio de Puerto Cortés",
    status: "aprobado",
    investment: "L 115,000,000.00",
    investmentAmount: 115000000,
    description:
      "En una decisión aprobada por unanimidad por la Corporación Municipal, se autorizó una transferencia presupuestaria para la ejecución de una nueva cartera de proyectos que beneficiará a miles de familias en todo el municipio.",
  }),
];

// ───────────────────────── TRANSFERENCIA PRESUPUESTARIA No. 4 ─────────────────────────

export type TransferProject = {
  id: string;
  title: string;
  community: string;
  possibleDuplicateOf?: string;
};

export const transferBudget = {
  numberLabel: "Transferencia Presupuestaria No. 4",
  session: "Sesión Ordinaria de Corporación Municipal No. 11",
  approvalNote: "Aprobada por unanimidad",
  totalAmountDisplay: "L. 115,000,000.00",
  totalAmountValue: 115000000,
  projects: [
    { id: "tp-1", title: "Construcción de canales pluviales en Marejada", community: "Marejada" },
    {
      id: "tp-2",
      title: "Pavimentación de la 19 calle entre 6 y 9 avenida y construcción de puente en la 20 calle, 7 avenida",
      community: "Barrio Buenos Aires",
    },
    { id: "tp-3", title: "Pavimentación en Colinas del Norte", community: "Colinas del Norte" },
    { id: "tp-4", title: "Reparación de cielo falso y pintura en la Escuela 4 de Julio", community: "Calán" },
    { id: "tp-5", title: "II etapa de baños, iluminación y cerco en la canchita", community: "Barrio La Curva" },
    {
      id: "tp-6",
      title: "I etapa de construcción de canales pluviales desde La Mercedes hacia la colonia 23 de Abril",
      community: "La Mercedes · Colonia 23 de Abril",
    },
    { id: "tp-7", title: "II etapa de pavimentación", community: "Bodega Coto" },
    { id: "tp-8", title: "Pavimentación, entronque con la CA-13", community: "Lomas del Puerto" },
    { id: "tp-9", title: "Pavimentación", community: "Barrio El Porvenir" },
    {
      id: "tp-10",
      title: "Pavimentación de la 3.ª avenida, desde el puente Kilimaco hasta la 11 calle oeste",
      community: "No especificado",
    },
    {
      id: "tp-11",
      title: "I etapa de construcción de canales pluviales en la 6 calle entre 8 y 11 avenida",
      community: "Barrio San Ramón",
    },
    { id: "tp-12", title: "Empedrado de callejón", community: "Calán" },
    { id: "tp-13", title: "Terminación de pavimento", community: "Calle Zona Americana" },
    { id: "tp-14", title: "Terminación de pavimento hacia la carretera vieja", community: "Colonia El Mirador" },
    { id: "tp-15", title: "Terminación de pavimento", community: "Calle La Sirena" },
    { id: "tp-16", title: "Pavimentación de calle Caoba", community: "Sector Calán" },
    { id: "tp-17", title: "Empedrado de callejón Kilómetro 6", community: "Sector Calán" },
    {
      id: "tp-18",
      title: "Ampliación y mejoramiento del sistema eléctrico",
      community: "La Junta, sector Ramal de Lima",
    },
    {
      id: "tp-19",
      title:
        "Traslado a IMDEPOR para el desarrollo del Complejo Municipal IMDEPOR: dos graderías techadas de concreto con baños y puntos de venta, sistema de alumbrado, y construcción de dos canchas multiusos para fútbol, baloncesto y voleibol",
      community: "Barrio Suyapa",
    },
    { id: "tp-20", title: "Reparación del techado e iluminación de la cancha multiusos", community: "Barrio Campo Rojo" },
    { id: "tp-21", title: "Remodelación Escuela Presentación Centeno", community: "Kele Kele" },
    { id: "tp-22", title: "I etapa de pavimentación en Lempira", community: "Sector Zapadril" },
    {
      id: "tp-23",
      title: "I etapa de construcción de canales pluviales en la calle hacia la playa, contiguo a la cancha de fútbol de la Base Naval",
      community: "Barrio Cienaguita",
    },
    { id: "tp-24", title: "Remodelación y reparación del centro social", community: "Cedros, sector Calán" },
    { id: "tp-25", title: "Construcción de canales pluviales en Residencial Palma Real", community: "Barrio Río Mar" },
    { id: "tp-26", title: "Remodelación y reparación del complejo Pancho Brocato", community: "Bo. San Ramón" },
    {
      id: "tp-27",
      title: "Remodelación del centro social, graderías y acceso peatonal y vehicular",
      community: "Zapadril Abajo",
    },
    {
      id: "tp-28",
      title: "I etapa de pavimentación en la colonia Buena Esperanza, contiguo a la salida vieja hacia San Pedro Sula",
      community: "Colonia Buena Esperanza",
      possibleDuplicateOf: "tp-33",
    },
    { id: "tp-29", title: "Construcción de escenario y adoquinado", community: "Barrio La Curva" },
    { id: "tp-30", title: "Construcción del techado de la cancha de la Escuela Heriberto Castillo", community: "Cienaguita" },
    {
      id: "tp-31",
      title: "Pavimentación, 11 calle entre la 8 y 9 avenida",
      community: "Barrio San Martín",
    },
    {
      id: "tp-32",
      title:
        "Construcción, ampliación y mejoramiento de obras, suministro e instalación de subestación eléctrica en el Edificio No. 1 y generadores de respaldo para el Edificio No. 2",
      community: "Municipalidad de Puerto Cortés",
    },
    {
      id: "tp-33",
      title: "I etapa de pavimentación en la colonia Buena Esperanza, contiguo a la salida vieja hacia San Pedro Sula",
      community: "Colonia Buena Esperanza",
      possibleDuplicateOf: "tp-28",
    },
    { id: "tp-34", title: "Construcción de caja puente", community: "Sector La Gran Villa" },
  ] as TransferProject[],
};

// ───────────────────────── GOBIERNO DE PUERTAS ABIERTAS (contenido editorial) ─────────────────────────

export const openGovernment = {
  eyebrow: "Gobierno de puertas abiertas",
  title: "Cerca de la gente, en cada sector",
  intro:
    "Consolidando un gobierno de puertas abiertas, la alcaldía mantiene canales directos de atención, comunicación y supervisión con la ciudadanía porteña.",
  pillars: [
    {
      id: "atencion",
      title: "Atención al ciudadano",
      description:
        "Implementamos con éxito la atención al ciudadano los días miércoles de por medio desde las 6 de la mañana.",
      icon: "DoorOpen" as const,
    },
    {
      id: "patronatos",
      title: "Reuniones con patronatos",
      description:
        "Mantenemos una comunicación activa a través de constantes reuniones sectoriales con los patronatos del municipio.",
      icon: "Users2" as const,
    },
    {
      id: "supervision",
      title: "Supervisión de obras",
      description:
        "Nuestro alcalde continúa supervisando de cerca las obras y proyectos que impulsan el desarrollo de Puerto Cortés.",
      icon: "HardHat" as const,
    },
    {
      id: "convenios",
      title: "Convenios y gestión institucional",
      description:
        "Alianzas con instituciones como Banadesa, Alorica, CEPUDO, CRIPCO, el Instituto Luis Braille y organizaciones religiosas amplían el impacto social de la gestión.",
      icon: "HeartHandshake" as const,
    },
  ],
};

// ───────────────────────── HELPERS ─────────────────────────

function splitCommunities(value: string): string[] {
  if (value === NOT_SPECIFIED) return [];
  return value
    .split(/·|,| y /)
    .map((c) => c.trim())
    .filter(Boolean);
}

export function getUniqueCommunities(list: MayorRecord[] = records): string[] {
  const set = new Set<string>();
  for (const rec of list) {
    for (const c of splitCommunities(rec.community)) set.add(c);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
}

export function getDashboardStats(list: MayorRecord[] = records) {
  const total = list.length;
  const finalizados = list.filter((p) => p.status === "finalizado").length;
  const enEjecucion = list.filter((p) => p.status === "en_ejecucion" || p.status === "en_proceso").length;
  const enLicitacion = list.filter((p) => p.status === "en_licitacion").length;
  const aprobados = list.filter((p) => p.status === "aprobado").length;
  const comunidades = getUniqueCommunities(list).length;

  return {
    total,
    finalizados,
    enEjecucion,
    enLicitacion,
    aprobados,
    aprobadosConTransferencia: aprobados + transferBudget.projects.length,
    comunidades,
    inversionAprobadaDisplay: transferBudget.totalAmountDisplay,
  };
}

export function getFeaturedRecords(list: MayorRecord[] = records): MayorRecord[] {
  return list.filter((p) => p.featured);
}

export type CategoryBreakdownItem = {
  category: RecordCategory;
  label: string;
  icon: LucideIcon;
  color: string;
  count: number;
};

/** Conteo por categoría, ordenado de mayor a menor para la gráfica de barras. */
export function getCategoryBreakdown(list: MayorRecord[] = records): CategoryBreakdownItem[] {
  return (Object.keys(categoryMeta) as RecordCategory[])
    .map((category) => ({
      category,
      label: categoryMeta[category].label,
      icon: categoryMeta[category].icon,
      color: categoryChartColor[category],
      count: list.filter((rec) => rec.category === category).length,
    }))
    .sort((a, b) => b.count - a.count);
}

export type StatusBreakdownItem = {
  status: RecordStatus;
  label: string;
  color: string;
  count: number;
};

/** Conteo por estado, en el orden narrativo del ciclo de vida (no alfabético). */
export function getStatusBreakdown(list: MayorRecord[] = records): StatusBreakdownItem[] {
  return statusLifecycleOrder.map((status) => ({
    status,
    label: statusMeta[status].label,
    color: statusChartColor[status],
    count: list.filter((rec) => rec.status === status).length,
  }));
}

export const communityOptions = getUniqueCommunities();
