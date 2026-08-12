export type SearchResultGroup = "TRÁMITES" | "SERVICIOS" | "NOTICIAS" | "DOCUMENTOS";

export type SearchResult = {
  id: string;
  group: SearchResultGroup;
  title: string;
  href: string;
  hint?: string;
};

export const searchIndex: SearchResult[] = [
  { id: "s1", group: "TRÁMITES", title: "Pago de impuesto sobre bienes inmuebles", href: "/tramites#pagos" },
  { id: "s2", group: "TRÁMITES", title: "Solvencia municipal", href: "/tramites#solvencia" },
  { id: "s3", group: "TRÁMITES", title: "Permiso de construcción", href: "/tramites#permisos" },
  { id: "s4", group: "TRÁMITES", title: "Consulta de estado de trámite", href: "/tramites#consulta" },
  { id: "s5", group: "TRÁMITES", title: "Plan de arbitrios 2026", href: "/transparencia#arbitrios" },
  { id: "s6", group: "SERVICIOS", title: "Recolección de desechos sólidos", href: "/servicios#recoleccion" },
  { id: "s7", group: "SERVICIOS", title: "Agua y saneamiento", href: "/servicios#agua" },
  { id: "s8", group: "SERVICIOS", title: "Bomberos — línea de emergencia", href: "/servicios#bomberos" },
  { id: "s9", group: "SERVICIOS", title: "Denuncias ciudadanas", href: "/tramites#denuncias" },
  { id: "s10", group: "NOTICIAS", title: "Municipalidad inicia obra en El Sofoco", href: "/noticias" },
  { id: "s11", group: "NOTICIAS", title: "IMDEPOR inaugura piscina municipal", href: "/noticias" },
  { id: "s12", group: "NOTICIAS", title: "Feria cultural en el Parque Central", href: "/noticias" },
  { id: "s13", group: "DOCUMENTOS", title: "Presupuesto municipal 2026", href: "/transparencia#presupuesto" },
  { id: "s14", group: "DOCUMENTOS", title: "Actas de sesiones de corporación", href: "/transparencia#documentos" },
  { id: "s15", group: "DOCUMENTOS", title: "Contrataciones y licitaciones abiertas", href: "/transparencia#contrataciones" },
];

export function searchMock(query: string): Record<SearchResultGroup, SearchResult[]> {
  const q = query.trim().toLowerCase();
  const groups: SearchResultGroup[] = ["TRÁMITES", "SERVICIOS", "NOTICIAS", "DOCUMENTOS"];
  const result = {} as Record<SearchResultGroup, SearchResult[]>;
  for (const g of groups) {
    result[g] = !q
      ? searchIndex.filter((r) => r.group === g).slice(0, 3)
      : searchIndex.filter((r) => r.group === g && r.title.toLowerCase().includes(q));
  }
  return result;
}
