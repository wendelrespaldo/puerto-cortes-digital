export type SearchResultGroup =
  | "TRÁMITES"
  | "SERVICIOS"
  | "OBRAS"
  | "NOTICIAS"
  | "PUERTO CORTÉS"
  | "DOCUMENTOS";

export type SearchResult = {
  id: string;
  group: SearchResultGroup;
  title: string;
  href: string;
  /** Extra terms (plurals, sinónimos, sin acentos) que también deben encontrar este resultado. */
  keywords?: string[];
};

export const searchIndex: SearchResult[] = [
  // TRÁMITES
  {
    id: "s1",
    group: "TRÁMITES",
    title: "Pago de impuesto sobre bienes inmuebles",
    href: "/tramites#pagos",
    keywords: ["pago de impuestos", "impuestos", "predial", "pagar impuestos"],
  },
  {
    id: "s2",
    group: "TRÁMITES",
    title: "Solvencia municipal",
    href: "/tramites#solvencia",
    keywords: ["constancia", "solvencia municipal"],
  },
  {
    id: "s3",
    group: "TRÁMITES",
    title: "Permiso de construcción",
    href: "/tramites#permisos",
    keywords: ["construccion", "permisos"],
  },
  {
    id: "s3b",
    group: "TRÁMITES",
    title: "Permiso de operación de negocio",
    href: "/tramites#permisos-negocio",
    keywords: ["negocio", "operacion", "permisos", "registro de negocio"],
  },
  {
    id: "s4",
    group: "TRÁMITES",
    title: "Consulta de estado de trámite",
    href: "/tramites#consulta",
    keywords: ["consultar tramite", "tramites", "estado", "expediente"],
  },
  {
    id: "s5",
    group: "TRÁMITES",
    title: "Plan de arbitrios 2026",
    href: "/transparencia#arbitrios",
    keywords: ["arbitrios", "tasas", "tributos"],
  },
  {
    id: "s5b",
    group: "TRÁMITES",
    title: "Formularios y requisitos",
    href: "/tramites#formularios",
    keywords: ["formularios", "requisitos", "descargar"],
  },
  {
    id: "s9",
    group: "TRÁMITES",
    title: "Denuncias ciudadanas",
    href: "/tramites#denuncias",
    keywords: ["denuncia", "denunciar", "reportar", "queja"],
  },
  {
    id: "s9b",
    group: "TRÁMITES",
    title: "Puerto Cortés te escucha",
    href: "/tramites#te-escucha",
    keywords: ["solicitud", "comentario", "participacion ciudadana"],
  },

  // SERVICIOS
  {
    id: "s6",
    group: "SERVICIOS",
    title: "Recolección de desechos sólidos",
    href: "/servicios#recoleccion",
    keywords: ["basura", "recoleccion de basura", "desechos", "rutas de recoleccion"],
  },
  {
    id: "s7",
    group: "SERVICIOS",
    title: "Agua y saneamiento",
    href: "/servicios#agua",
    keywords: ["agua potable", "saneamiento", "conexion de agua"],
  },
  {
    id: "s8",
    group: "SERVICIOS",
    title: "Bomberos — línea de emergencia",
    href: "/servicios#bomberos",
    keywords: ["bomberos", "emergencia", "incendio"],
  },
  {
    id: "s8b",
    group: "SERVICIOS",
    title: "Solicitar un servicio",
    href: "/servicios#solicitud",
    keywords: ["solicitud", "poda", "bacheo", "iluminacion"],
  },

  // OBRAS
  {
    id: "o1",
    group: "OBRAS",
    title: "Pavimentación y drenaje — La Roca",
    href: "/obras",
    keywords: ["obras", "pavimentacion", "la roca"],
  },
  {
    id: "o2",
    group: "OBRAS",
    title: "Losa y canales — Barrio San Ramón",
    href: "/obras",
    keywords: ["canales", "san ramon", "drenaje"],
  },
  {
    id: "o3",
    group: "OBRAS",
    title: "Mapa de obras en ejecución",
    href: "/obras#mapa-obras",
    keywords: ["mapa de obras", "obras cerca de ti"],
  },

  // NOTICIAS
  {
    id: "n1",
    group: "NOTICIAS",
    title: "Municipalidad inicia obra en El Sofoco",
    href: "/noticias",
    keywords: ["sofoco", "noticia"],
  },
  {
    id: "n2",
    group: "NOTICIAS",
    title: "IMDEPOR inaugura piscina municipal",
    href: "/noticias",
    keywords: ["imdepor", "piscina", "deporte"],
  },
  {
    id: "n3",
    group: "NOTICIAS",
    title: "Feria cultural en el Parque Central",
    href: "/noticias",
    keywords: ["cultura", "feria", "parque central"],
  },

  // PUERTO CORTÉS (turismo)
  {
    id: "t1",
    group: "PUERTO CORTÉS",
    title: "Playas de Puerto Cortés",
    href: "/turismo#playas",
    keywords: ["playa", "playas", "costa", "mar"],
  },
  {
    id: "t2",
    group: "PUERTO CORTÉS",
    title: "Naturaleza porteña",
    href: "/turismo#naturaleza",
    keywords: ["naturaleza", "laguna", "manglar"],
  },
  {
    id: "t3",
    group: "PUERTO CORTÉS",
    title: "Gastronomía porteña",
    href: "/turismo#gastronomia",
    keywords: ["comida", "gastronomia", "mariscos"],
  },
  {
    id: "t4",
    group: "PUERTO CORTÉS",
    title: "Cultura y tradición",
    href: "/turismo#cultura",
    keywords: ["cultura", "tradicion"],
  },
  {
    id: "t5",
    group: "PUERTO CORTÉS",
    title: "El Puerto — historia marítima",
    href: "/turismo#puerto",
    keywords: ["puerto", "historia", "muelle", "barco"],
  },
  {
    id: "t6",
    group: "PUERTO CORTÉS",
    title: "Eventos y celebraciones",
    href: "/turismo#eventos",
    keywords: ["eventos", "celebracion", "festival"],
  },

  // DOCUMENTOS / TRANSPARENCIA
  {
    id: "d1",
    group: "DOCUMENTOS",
    title: "Presupuesto municipal 2026",
    href: "/transparencia#presupuesto",
    keywords: ["presupuesto", "finanzas"],
  },
  {
    id: "d2",
    group: "DOCUMENTOS",
    title: "Actas de sesiones de corporación",
    href: "/transparencia#documentos",
    keywords: ["actas", "sesiones"],
  },
  {
    id: "d3",
    group: "DOCUMENTOS",
    title: "Contrataciones y licitaciones abiertas",
    href: "/transparencia#contrataciones",
    keywords: ["licitacion", "contrataciones", "compras"],
  },
];

export type PopularSearch = { label: string; href: string };

/** Chips de "lo más buscado" — cada uno es un enlace real, no un texto de búsqueda. */
export const popularSearches: PopularSearch[] = [
  { label: "Pago de impuestos", href: "/tramites#pagos" },
  { label: "Permiso de construcción", href: "/tramites#permisos" },
  { label: "Solvencia municipal", href: "/tramites#solvencia" },
  { label: "Recolección de basura", href: "/servicios#recoleccion" },
  { label: "Agua", href: "/servicios#agua" },
  { label: "Trámites", href: "/tramites" },
  { label: "Denuncias", href: "/tramites#denuncias" },
  { label: "Plan de arbitrios", href: "/transparencia#arbitrios" },
];

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function matches(item: SearchResult, normalizedQuery: string): boolean {
  const haystack = normalize([item.title, ...(item.keywords ?? [])].join(" "));
  if (haystack.includes(normalizedQuery)) return true;
  const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 1);
  return words.length > 0 && words.every((w) => haystack.includes(w));
}

export const searchGroups: SearchResultGroup[] = [
  "TRÁMITES",
  "SERVICIOS",
  "OBRAS",
  "NOTICIAS",
  "PUERTO CORTÉS",
  "DOCUMENTOS",
];

export function searchMock(query: string): Record<SearchResultGroup, SearchResult[]> {
  const q = normalize(query);
  const result = {} as Record<SearchResultGroup, SearchResult[]>;
  for (const g of searchGroups) {
    const items = searchIndex.filter((r) => r.group === g);
    result[g] = !q ? items.slice(0, 3) : items.filter((r) => matches(r, q));
  }
  return result;
}

/** El primer resultado relevante — usado cuando el usuario presiona Enter. */
export function bestMatch(query: string): SearchResult | null {
  const q = normalize(query);
  if (!q) return null;
  for (const g of searchGroups) {
    const hit = searchIndex.find((r) => r.group === g && matches(r, q));
    if (hit) return hit;
  }
  return null;
}
