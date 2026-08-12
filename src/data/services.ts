import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  ClipboardList,
  Search,
  Megaphone,
  AlertTriangle,
  Droplets,
  Truck,
  Flame,
} from "lucide-react";

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  href: string;
  color: "green" | "blue" | "coral" | "amber";
};

export const services: Service[] = [
  {
    id: "pagar-impuestos",
    icon: Wallet,
    title: "Pagar impuestos",
    description: "Consulta y realiza tus pagos municipales.",
    detail: "Bienes inmuebles, industria, comercio y más — en línea.",
    href: "/tramites#pagos",
    color: "green",
  },
  {
    id: "tramitar-permisos",
    icon: ClipboardList,
    title: "Tramitar permisos",
    description: "Encuentra requisitos y procedimientos.",
    detail: "Construcción, operación de negocios y ambulantes.",
    href: "/tramites#permisos",
    color: "blue",
  },
  {
    id: "consultar-tramite",
    icon: Search,
    title: "Consultar trámite",
    description: "Consulta el estado de tu solicitud.",
    detail: "Sigue el avance de tu expediente en tiempo real.",
    href: "/tramites#consulta",
    color: "amber",
  },
  {
    id: "solicitar-servicio",
    icon: Megaphone,
    title: "Solicitar un servicio",
    description: "Haz una solicitud a la municipalidad.",
    detail: "Poda, iluminación, bacheo y más solicitudes.",
    href: "/servicios#solicitud",
    color: "coral",
  },
  {
    id: "reportar-denunciar",
    icon: AlertTriangle,
    title: "Reportar / Denunciar",
    description: "Comunica una situación a la municipalidad.",
    detail: "Denuncias ciudadanas con seguimiento confidencial.",
    href: "/tramites#denuncias",
    color: "coral",
  },
  {
    id: "agua-saneamiento",
    icon: Droplets,
    title: "Agua y saneamiento",
    description: "Conexiones, pagos y reportes de agua.",
    detail: "Gestiona tu servicio de agua potable.",
    href: "/servicios#agua",
    color: "blue",
  },
  {
    id: "recoleccion",
    icon: Truck,
    title: "Recolección",
    description: "Rutas y horarios de desechos sólidos.",
    detail: "Consulta el día de recolección en tu sector.",
    href: "/servicios#recoleccion",
    color: "green",
  },
  {
    id: "bomberos",
    icon: Flame,
    title: "Bomberos",
    description: "Emergencias y prevención.",
    detail: "Atención inmediata y campañas de prevención.",
    href: "/servicios#bomberos",
    color: "coral",
  },
];

export const popularSearches: string[] = [
  "Pago de impuestos",
  "Permiso de construcción",
  "Solvencia municipal",
  "Recolección de basura",
  "Agua",
  "Trámites",
  "Denuncias",
  "Plan de arbitrios",
];
