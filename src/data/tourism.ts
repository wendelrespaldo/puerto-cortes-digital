import {
  Waves,
  Leaf,
  UtensilsCrossed,
  Landmark,
  Compass,
  Anchor,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";

export type TourismCategory = {
  id: string;
  title: string;
  tagline: string;
  /** Resumen corto para tarjetas (1–2 líneas). */
  description: string;
  /** Texto editorial más amplio para /turismo, basado en fuentes verificadas. */
  longText: string;
  icon: LucideIcon;
  /** Foto real cuando existe; si es null se usa un tratamiento gráfico en su lugar. */
  image: string | null;
  /** Degradado de respaldo usado en el header/preview y cuando no hay foto. */
  gradient: string;
};

export const tourismCategories: TourismCategory[] = [
  {
    id: "playas",
    title: "Playas",
    tagline: "Costa caribeña",
    description: "Arena y atardeceres frente al Caribe, en el corazón de la ciudad.",
    longText:
      "La costa porteña se extiende junto al Canal de Puerto Cortés, con playas como la de Cieneguita —el asentamiento más antiguo de la ciudad— y la playa municipal de El Porvenir, escenario cada agosto de la Noche Veneciana.",
    icon: Waves,
    image: "/images/turismo/atardecer-puerto.jpg",
    gradient: "from-pc-blue-600 to-pc-navy-900",
  },
  {
    id: "naturaleza",
    title: "Naturaleza",
    tagline: "Verde porteño",
    description: "La Laguna de Alvarado: humedal de importancia internacional.",
    longText:
      "La Laguna de Alvarado es un sistema de humedal declarado Sitio Ramsar de Importancia Internacional, con manglares y canales que sirven de refugio a aves acuáticas y especies marinas, a minutos del centro de la ciudad.",
    icon: Leaf,
    image: "/images/turismo/laguna-alvarado.jpg",
    gradient: "from-pc-green-500 to-pc-blue-700",
  },
  {
    id: "gastronomia",
    title: "Gastronomía",
    tagline: "Sabor caribeño",
    description: "Machuca, casabe y mariscos: la cocina garífuna del Caribe hondureño.",
    longText:
      "La cocina porteña lleva la huella garífuna: machuca de plátano, casabe de yuca, sopa de caracol y pescado fresco del Caribe, preparados con coco, siguiendo recetas que se transmiten de generación en generación.",
    icon: UtensilsCrossed,
    image: "/images/turismo/gastronomia-mariscos.jpg",
    gradient: "from-pc-amber-500 to-pc-coral-600",
  },
  {
    id: "cultura",
    title: "Cultura",
    tagline: "Tradición viva",
    description: "Historia, fe y el orgullo de una ciudad con más de 150 años.",
    longText:
      "De la herencia garífuna a la Semana Santa y la Feria Agostina en honor a la Virgen de Santa María de Asunción, patrona de los porteños, la vida cultural de Puerto Cortés se vive en sus calles, su música y su gente.",
    icon: Landmark,
    image: "/images/municipalidad/palacio-municipal-2.jpg",
    gradient: "from-pc-coral-600 to-pc-navy-900",
  },
  {
    id: "turismo",
    title: "Destino Puerto Cortés",
    tagline: "Puerta al Caribe",
    description: "El primer puerto de Honduras, entre mar, ciudad y naturaleza.",
    longText:
      "A 157 años de su fundación, Puerto Cortés combina su papel como el puerto más importante de Honduras con playas, humedales y una identidad caribeña que la distingue de cualquier otra ciudad del país.",
    icon: Compass,
    image: "/images/turismo/playa-aerea.jpg",
    gradient: "from-pc-green-700 to-pc-blue-800",
  },
  {
    id: "puerto",
    title: "El Puerto",
    tagline: "Historia marítima",
    description: "El muelle que conecta a Puerto Cortés con el mundo.",
    longText:
      "Bajo el nombre de Puerto Caballos desde 1524, este punto de la costa caribeña fue el origen del que hoy es el principal puerto de Honduras, y sigue siendo el motor económico y marítimo de la ciudad.",
    icon: Anchor,
    image: "/images/economia/puerto-cargo-ship.jpg",
    gradient: "from-pc-navy-800 to-pc-blue-900",
  },
  {
    id: "eventos",
    title: "Eventos",
    tagline: "Vida comunitaria",
    description: "Noche Veneciana, Feria Agostina y la vida frente al mar.",
    longText:
      "Cada agosto, la Feria Agostina y su Noche Veneciana —Patrimonio Cultural de Honduras desde 2022— llenan la bahía de embarcaciones iluminadas, en una tradición que nació con los inmigrantes italianos que llegaron al puerto.",
    icon: PartyPopper,
    image: "/images/turismo/playa-comunidad.jpg",
    gradient: "from-pc-amber-500 to-pc-green-600",
  },
];

export function getTourismCategory(id: string) {
  return tourismCategories.find((c) => c.id === id);
}
