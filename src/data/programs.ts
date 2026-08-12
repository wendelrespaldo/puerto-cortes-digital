export type Program = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export const programs: Program[] = [
  {
    id: "programas-sociales",
    title: "Programas Sociales",
    description: "Apoyo a familias, adultos mayores y grupos vulnerables.",
    image: "/images/turismo/playa-comunidad.jpg",
    href: "/municipalidad#programas",
  },
  {
    id: "gestion-municipal",
    title: "Gestión Municipal",
    description: "Planificación, metas y resultados de la administración.",
    image: "/images/municipalidad/palacio-municipal-1.jpg",
    href: "/municipalidad#gestion",
  },
  {
    id: "cultura-turismo",
    title: "Cultura y Turismo",
    description: "Identidad, historia y destinos de Puerto Cortés.",
    image: "/images/turismo/atardecer-puerto.jpg",
    href: "/turismo",
  },
  {
    id: "infancia-juventud",
    title: "Infancia y Juventud",
    description: "Programas educativos, becas y espacios seguros.",
    image: "/images/municipalidad/palacio-municipal-2.jpg",
    href: "/municipalidad#programas",
  },
  {
    id: "bomberos",
    title: "Bomberos",
    description: "Prevención, respuesta y educación en emergencias.",
    image: "/images/obras/canales-san-ramon.jpg",
    href: "/servicios#bomberos",
  },
  {
    id: "medio-ambiente",
    title: "Medio Ambiente",
    description: "Sostenibilidad, arborización y espacios verdes.",
    image: "/images/turismo/playa-comunidad.jpg",
    href: "/municipalidad#ambiente",
  },
  {
    id: "imdepor",
    title: "IMDEPOR",
    description: "Deporte y recreación para toda la comunidad.",
    image: "/images/obras/pavimentacion-la-roca.jpg",
    href: "/municipalidad#imdepor",
  },
];

export type MunicipalSystem = {
  id: string;
  title: string;
  description: string;
};

export const municipalSystems: MunicipalSystem[] = [
  { id: "correo", title: "Correo Institucional", description: "Acceso al correo oficial" },
  { id: "imdepor-sys", title: "IMDEPOR", description: "Plataforma deportiva municipal" },
  { id: "documentacion", title: "Control de Documentación", description: "Gestión documental" },
  { id: "economico-sys", title: "Desarrollo Económico", description: "Registro de negocios" },
  { id: "gestion-sys", title: "Control de Gestión", description: "Seguimiento de metas" },
  { id: "sociales-sys", title: "Programas Sociales", description: "Padrón de beneficiarios" },
];
