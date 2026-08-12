import type { LucideIcon } from "lucide-react";
import {
  FileText,
  ClipboardList,
  Search,
  FileSpreadsheet,
  Droplets,
  Trash2,
  Flame,
  Send,
  Megaphone,
  Ear,
  Phone,
  Siren,
  Landmark,
  Users,
  TrendingUp,
  Palette,
  Leaf,
  Trophy,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { tourismCategories } from "./tourism";

export type MegaMenuLink = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export type MegaMenuGroup = {
  title: string;
  links: MegaMenuLink[];
};

export type NavItem = {
  label: string;
  href: string;
  /** Da un acento visual sutil al link y activa el mega menú de preview fotográfico. */
  highlight?: boolean;
  megaMenu?: {
    tagline: string;
    groups: MegaMenuGroup[];
    featured?: {
      title: string;
      description: string;
      href: string;
      cta: string;
    };
  };
};

export const mainNav: NavItem[] = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Ciudadanía",
    href: "/tramites",
    megaMenu: {
      tagline: "Todo lo que necesitas resolver, sin filas ni vueltas.",
      groups: [
        {
          title: "Trámites",
          links: [
            {
              label: "Trámites y permisos",
              href: "/tramites",
              description: "Impuestos, permisos y solvencias municipales.",
              icon: FileText,
            },
            {
              label: "Requisitos",
              href: "/tramites#requisitos",
              description: "Qué necesitas para cada gestión.",
              icon: ClipboardList,
            },
            {
              label: "Consulta de trámite",
              href: "/tramites#consulta",
              description: "Revisa el estado de tu solicitud.",
              icon: Search,
            },
            {
              label: "Formularios",
              href: "/tramites#formularios",
              description: "Descarga los formatos oficiales.",
              icon: FileSpreadsheet,
            },
          ],
        },
        {
          title: "Servicios",
          links: [
            {
              label: "Agua y saneamiento",
              href: "/servicios#agua",
              description: "Conexiones, pagos y reportes de agua.",
              icon: Droplets,
            },
            {
              label: "Recolección de desechos",
              href: "/servicios#recoleccion",
              description: "Rutas y horarios de recolección.",
              icon: Trash2,
            },
            {
              label: "Bomberos",
              href: "/servicios#bomberos",
              description: "Emergencias y prevención.",
              icon: Flame,
            },
            {
              label: "Solicitar servicios",
              href: "/servicios",
              description: "Pide una gestión a la municipalidad.",
              icon: Send,
            },
          ],
        },
        {
          title: "Atención",
          links: [
            {
              label: "Denuncias",
              href: "/tramites#denuncias",
              description: "Reporta una situación irregular.",
              icon: Megaphone,
            },
            {
              label: "Puerto Cortés te escucha",
              href: "/tramites#te-escucha",
              description: "Tu voz llega directo a la municipalidad.",
              icon: Ear,
            },
            {
              label: "Contacto",
              href: "/municipalidad#contacto",
              description: "Directorio y canales oficiales.",
              icon: Phone,
            },
            {
              label: "Emergencias",
              href: "/servicios#bomberos",
              description: "Líneas de auxilio inmediato.",
              icon: Siren,
            },
          ],
        },
      ],
      featured: {
        title: "Portal Ciudadano",
        description: "Gestiona tus trámites, pagos y notificaciones desde un solo panel.",
        href: "/tramites#portal",
        cta: "Entrar al portal",
      },
    },
  },
  {
    label: "Municipalidad",
    href: "/municipalidad",
    megaMenu: {
      tagline: "Cómo se gobierna y gestiona Puerto Cortés.",
      groups: [
        {
          title: "Institución",
          links: [
            {
              label: "Corporación Municipal",
              href: "/municipalidad#corporacion",
              description: "Autoridades y organización.",
              icon: Landmark,
            },
            {
              label: "Gestión Municipal",
              href: "/municipalidad#gestion",
              description: "Planes, metas e indicadores.",
              icon: Building2,
            },
            {
              label: "Desarrollo Económico",
              href: "/municipalidad#economico",
              description: "Inversión, empleo y comercio local.",
              icon: TrendingUp,
            },
          ],
        },
        {
          title: "Comunidad",
          links: [
            {
              label: "Programas Sociales",
              href: "/municipalidad#programas",
              description: "Apoyo a familias y grupos vulnerables.",
              icon: Users,
            },
            {
              label: "Cultura y Turismo",
              href: "/turismo",
              description: "Identidad, historia y destinos.",
              icon: Palette,
            },
            {
              label: "Medio Ambiente",
              href: "/municipalidad#ambiente",
              description: "Sostenibilidad y espacios verdes.",
              icon: Leaf,
            },
            {
              label: "IMDEPOR",
              href: "/municipalidad#imdepor",
              description: "Deporte y recreación municipal.",
              icon: Trophy,
            },
          ],
        },
      ],
    },
  },
  {
    label: "Servicios",
    href: "/servicios",
  },
  {
    label: "Puerto Cortés",
    href: "/turismo",
    highlight: true,
    megaMenu: {
      tagline: "Mar, historia y sabor caribeño.",
      groups: [
        {
          title: "Descubre Puerto Cortés",
          links: tourismCategories.map((cat) => ({
            label: cat.title,
            href: `/turismo#${cat.id}`,
            description: cat.description,
            icon: cat.icon,
          })),
        },
      ],
      featured: {
        title: "Destino Puerto Cortés",
        description: "Playas, cultura, gastronomía y el puerto que le da nombre a la ciudad.",
        href: "/turismo",
        cta: "Descubrir Puerto Cortés",
      },
    },
  },
  {
    label: "Obras",
    href: "/obras",
  },
  {
    label: "Noticias",
    href: "/noticias",
  },
  {
    label: "Transparencia",
    href: "/transparencia",
    megaMenu: {
      tagline: "Datos abiertos para una gestión que rinde cuentas.",
      groups: [
        {
          title: "Transparencia",
          links: [
            {
              label: "Presupuesto",
              href: "/transparencia#presupuesto",
              description: "Ingresos y ejecución financiera.",
              icon: Landmark,
            },
            {
              label: "Contrataciones",
              href: "/transparencia#contrataciones",
              description: "Procesos de compra y licitación.",
              icon: FileText,
            },
            {
              label: "Plan de arbitrios",
              href: "/transparencia#arbitrios",
              description: "Tasas y tributos vigentes.",
              icon: FileSpreadsheet,
            },
            {
              label: "Sistemas municipales",
              href: "/transparencia#sistemas",
              description: "Accesos y plataformas internas.",
              icon: ShieldCheck,
            },
          ],
        },
      ],
    },
  },
];

export const floatingActions = [
  { label: "Buscar", icon: Search, action: "search" as const },
  { label: "Trámites", icon: FileText, href: "/tramites" },
  { label: "Denunciar", icon: Megaphone, href: "/tramites#denuncias" },
  { label: "Contactar", icon: Phone, href: "/municipalidad#contacto" },
];
