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
  description: string;
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
    description: "Arena dorada y atardeceres inolvidables frente al Caribe.",
    icon: Waves,
    image: "/images/turismo/atardecer-puerto.jpg",
    gradient: "from-pc-blue-600 to-pc-navy-900",
  },
  {
    id: "naturaleza",
    title: "Naturaleza",
    tagline: "Verde porteño",
    description: "Lagunas, manglares y biodiversidad a minutos del centro.",
    icon: Leaf,
    image: null,
    gradient: "from-pc-green-500 to-pc-blue-700",
  },
  {
    id: "gastronomia",
    title: "Gastronomía",
    tagline: "Sabor caribeño",
    description: "Mariscos, coco y la sazón que distingue a Puerto Cortés.",
    icon: UtensilsCrossed,
    image: null,
    gradient: "from-pc-amber-500 to-pc-coral-600",
  },
  {
    id: "cultura",
    title: "Cultura",
    tagline: "Tradición viva",
    description: "Historia, música y el orgullo de ser porteño.",
    icon: Landmark,
    image: "/images/municipalidad/palacio-municipal-2.jpg",
    gradient: "from-pc-coral-600 to-pc-navy-900",
  },
  {
    id: "turismo",
    title: "Destino Puerto Cortés",
    tagline: "Puerta al Caribe",
    description: "El primer puerto de Honduras, entre mar, ciudad y naturaleza.",
    icon: Compass,
    image: "/images/hero/hero-ciudad-mar.jpg",
    gradient: "from-pc-green-700 to-pc-blue-800",
  },
  {
    id: "puerto",
    title: "El Puerto",
    tagline: "Historia marítima",
    description: "El muelle que conecta a Puerto Cortés con el mundo.",
    icon: Anchor,
    image: "/images/economia/puerto-cargo-ship.jpg",
    gradient: "from-pc-navy-800 to-pc-blue-900",
  },
  {
    id: "eventos",
    title: "Eventos",
    tagline: "Vida comunitaria",
    description: "Ferias, playas activas y celebraciones durante todo el año.",
    icon: PartyPopper,
    image: "/images/turismo/playa-comunidad.jpg",
    gradient: "from-pc-amber-500 to-pc-green-600",
  },
];

export function getTourismCategory(id: string) {
  return tourismCategories.find((c) => c.id === id);
}
