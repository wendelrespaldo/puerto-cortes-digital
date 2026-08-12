export type ProjectStatus = "ejecucion" | "completada" | "planificada";

export type Project = {
  id: string;
  name: string;
  location: string;
  sector: string;
  investment: string;
  status: ProjectStatus;
  progress: number;
  image: string;
  description: string;
  coords: { x: number; y: number }; // % position on the mock map
  category: "obras" | "educacion" | "deporte" | "infraestructura";
};

export const statusLabels: Record<ProjectStatus, { label: string; dot: string }> = {
  ejecucion: { label: "En ejecución", dot: "bg-pc-amber-500" },
  completada: { label: "Completada", dot: "bg-pc-green-500" },
  planificada: { label: "Planificada", dot: "bg-pc-blue-400" },
};

export const projects: Project[] = [
  {
    id: "pavimentacion-la-roca",
    name: "Pavimentación y drenaje — La Roca",
    location: "Colonia La Roca",
    sector: "Infraestructura vial",
    investment: "L 1,354,000",
    status: "completada",
    progress: 100,
    image: "/images/obras/pavimentacion-la-roca.jpg",
    description:
      "Pavimentación de calle principal con sistema de drenaje pluvial, entregada a la comunidad.",
    coords: { x: 32, y: 40 },
    category: "obras",
  },
  {
    id: "canales-san-ramon",
    name: "Losa y canales — Barrio San Ramón",
    location: "Barrio San Ramón",
    sector: "Agua y saneamiento",
    investment: "L 986,500",
    status: "ejecucion",
    progress: 64,
    image: "/images/obras/canales-san-ramon.jpg",
    description:
      "Construcción de canal de aguas lluvias y losa de concreto para mitigar inundaciones.",
    coords: { x: 58, y: 28 },
    category: "infraestructura",
  },
  {
    id: "graderias-ticamaya",
    name: "Graderías — Complejo Ticamaya",
    location: "Ticamaya",
    sector: "Deporte y recreación",
    investment: "L 742,300",
    status: "ejecucion",
    progress: 41,
    image: "/images/obras/pavimentacion-la-roca.jpg",
    description: "Ampliación de graderías para fortalecer los espacios deportivos comunitarios.",
    coords: { x: 74, y: 62 },
    category: "deporte",
  },
  {
    id: "escuela-savoy",
    name: "Cerco perimetral — Escuela Savoy",
    location: "Barrio Savoy",
    sector: "Educación",
    investment: "L 412,900",
    status: "planificada",
    progress: 12,
    image: "/images/obras/canales-san-ramon.jpg",
    description: "Construcción de cerco perimetral para mejorar la seguridad del centro educativo.",
    coords: { x: 44, y: 72 },
    category: "educacion",
  },
  {
    id: "iluminacion-san-isidro",
    name: "Iluminación — San Isidro",
    location: "San Isidro",
    sector: "Infraestructura",
    investment: "L 298,000",
    status: "completada",
    progress: 100,
    image: "/images/obras/pavimentacion-la-roca.jpg",
    description: "Instalación de luminarias LED en la vía principal del sector San Isidro.",
    coords: { x: 22, y: 58 },
    category: "infraestructura",
  },
  {
    id: "union-medina",
    name: "II Etapa — Unión Medina",
    location: "Colonia Unión Medina",
    sector: "Infraestructura vial",
    investment: "L 1,120,400",
    status: "ejecucion",
    progress: 28,
    image: "/images/obras/canales-san-ramon.jpg",
    description: "Segunda etapa de pavimentación y obras complementarias del sector.",
    coords: { x: 66, y: 44 },
    category: "obras",
  },
];
