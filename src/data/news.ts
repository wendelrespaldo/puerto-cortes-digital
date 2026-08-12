export type NewsCategory =
  | "OBRAS"
  | "COMUNIDAD"
  | "MUNICIPALIDAD"
  | "DEPORTE"
  | "CULTURA"
  | "TURISMO";

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  image: string;
  featured?: boolean;
};

export const news: NewsItem[] = [
  {
    id: "obra-drenaje-el-sofoco",
    title: "Municipalidad inicia nueva obra de infraestructura en El Sofoco",
    excerpt:
      "El proyecto de pavimentación y drenaje beneficiará a más de 800 familias del sector, con una inversión superior a un millón de lempiras.",
    date: "2026-08-08",
    category: "OBRAS",
    image: "/images/obras/canales-san-ramon.jpg",
    featured: true,
  },
  {
    id: "imdepor-piscina",
    title: "IMDEPOR inaugura nueva piscina municipal semiolímpica",
    excerpt:
      "La nueva instalación deportiva busca fomentar la disciplina de la natación entre niños y jóvenes de Puerto Cortés.",
    date: "2026-08-05",
    category: "DEPORTE",
    image: "/images/turismo/playa-comunidad.jpg",
  },
  {
    id: "pago-impuestos-desarrollo",
    title: "El pago puntual de impuestos impulsa el desarrollo de Puerto Cortés",
    excerpt:
      "La Alcaldía recuerda a la ciudadanía los beneficios de mantenerse solvente y los canales disponibles para pagar en línea.",
    date: "2026-08-04",
    category: "MUNICIPALIDAD",
    image: "/images/municipalidad/palacio-municipal-1.jpg",
  },
  {
    id: "feria-cultural-centro",
    title: "Feria cultural llena de color el Parque Central",
    excerpt:
      "Artesanos, gastronomía típica y música en vivo se tomaron el corazón de la ciudad durante todo el fin de semana.",
    date: "2026-08-02",
    category: "CULTURA",
    image: "/images/turismo/playa-comunidad.jpg",
  },
  {
    id: "playas-limpias",
    title: "Jornada 'Playas Limpias' recolecta más de dos toneladas de desechos",
    excerpt:
      "Voluntarios y personal municipal se unieron para conservar las costas de Puerto Cortés de cara a la temporada alta.",
    date: "2026-07-30",
    category: "TURISMO",
    image: "/images/turismo/atardecer-puerto.jpg",
  },
  {
    id: "patronatos-eleccion",
    title: "Comunidad elige nuevas juntas de patronato en varios sectores",
    excerpt:
      "Los vecinos participaron activamente en la renovación de liderazgo comunitario para el próximo período.",
    date: "2026-07-27",
    category: "COMUNIDAD",
    image: "/images/municipalidad/palacio-municipal-2.jpg",
  },
  {
    id: "cartera-proyectos",
    title: "Alcaldía presenta cartera de proyectos para el segundo semestre",
    excerpt:
      "Más de quince obras de infraestructura, educación y saneamiento fueron anunciadas para los próximos meses.",
    date: "2026-07-24",
    category: "MUNICIPALIDAD",
    image: "/images/obras/pavimentacion-la-roca.jpg",
  },
  {
    id: "recoleccion-rutas",
    title: "Ajustan horarios de recolección de desechos en rutas 1 y 11",
    excerpt:
      "El cambio busca optimizar el servicio y reducir tiempos de espera en los sectores más poblados.",
    date: "2026-07-21",
    category: "COMUNIDAD",
    image: "/images/municipalidad/palacio-municipal-1.jpg",
  },
];

/**
 * La cinta "AHORA" reutiliza las noticias reales (mismo id) para que cada
 * titular lleve directo a su tarjeta correspondiente en /noticias.
 */
export const newsTicker: { id: string; text: string }[] = news
  .slice(0, 6)
  .map((n) => ({ id: n.id, text: n.title }));
