import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
  WhatsappIcon,
} from "@/components/shared/SocialIcons";

const ASWEN_WHATSAPP_URL =
  "https://wa.me/50433912922?text=" +
  encodeURIComponent(
    "Hola, vi el portal Puerto Cortés Digital y quiero más información."
  );

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Municipalidad",
    links: [
      { label: "Corporación Municipal", href: "/municipalidad#corporacion" },
      { label: "Gestión Municipal", href: "/municipalidad#gestion" },
      { label: "Desarrollo Económico", href: "/municipalidad#economico" },
      { label: "Medio Ambiente", href: "/municipalidad#ambiente" },
    ],
  },
  {
    title: "Ciudadanía",
    links: [
      { label: "Trámites y permisos", href: "/tramites" },
      { label: "Consultar trámite", href: "/tramites#consulta" },
      { label: "Denuncias", href: "/tramites#denuncias" },
      { label: "Puerto Cortés te escucha", href: "/tramites#te-escucha" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Agua y saneamiento", href: "/servicios#agua" },
      { label: "Recolección de desechos", href: "/servicios#recoleccion" },
      { label: "Bomberos", href: "/servicios#bomberos" },
      { label: "IMDEPOR", href: "/municipalidad#imdepor" },
    ],
  },
  {
    title: "Transparencia",
    links: [
      { label: "Presupuesto", href: "/transparencia#presupuesto" },
      { label: "Contrataciones", href: "/transparencia#contrataciones" },
      { label: "Plan de arbitrios", href: "/transparencia#arbitrios" },
      { label: "Documentos", href: "/transparencia#documentos" },
    ],
  },
  {
    title: "Noticias",
    links: [
      { label: "Últimas noticias", href: "/noticias" },
      { label: "Sala de prensa", href: "/noticias#prensa" },
      { label: "Obras en marcha", href: "/obras" },
      { label: "Puerto Cortés", href: "/turismo" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-pc-navy-950 text-pc-sand-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo/escudo-pc.png"
                alt="Escudo de la Municipalidad de Puerto Cortés"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="font-heading text-base font-bold text-white">
                  Puerto Cortés Digital
                </p>
                <p className="text-xs text-pc-sand-100/60">Portal del Ciudadano</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-pc-sand-100/70">
              Tu municipio, tus servicios y toda la información que necesitas,
              ahora en un solo lugar.
            </p>
            <div className="mt-5 space-y-2.5 text-sm text-pc-sand-100/80">
              <p className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-pc-green-400" />
                (504) 2755-2560
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-pc-green-400" />
                info@ampuertocortes.hn
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-pc-green-400" />
                Barrio Casco Urbano, Puerto Cortés, Cortés, Honduras
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-pc-green-400" />
                Lunes a viernes, 8:00 a.m. – 4:00 p.m.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              {[FacebookIcon, InstagramIcon, XIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Red social"
                  className="flex size-9 items-center justify-center rounded-full bg-white/5 text-pc-sand-100/80 transition hover:bg-pc-green-600 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold text-white">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-pc-sand-100/65 transition hover:text-pc-green-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-pc-sand-100/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Municipalidad de Puerto Cortés. Todos los derechos reservados.</p>
          <p>Demo de portal digital — prototipo de presentación.</p>
        </div>
      </div>

      <div className="border-t border-white/5 bg-pc-navy-950 pb-16 lg:pb-0">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
          <a
            href={ASWEN_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir a ASWEN GROUP por WhatsApp al 3391-2922"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-pc-sand-100/45 transition-all duration-300 hover:bg-white/5 hover:text-pc-sand-100/80"
          >
            <span className="relative flex size-6 items-center justify-center rounded-full bg-white/5 text-pc-green-400/70 transition-all duration-300 group-hover:scale-110 group-hover:bg-pc-green-500/15 group-hover:text-pc-green-300">
              <WhatsappIcon className="size-3.5" />
              <span className="absolute inset-0 -z-10 rounded-full bg-pc-green-400/0 transition-all duration-300 group-hover:bg-pc-green-400/20 group-hover:blur-md" />
            </span>
            <span>
              Diseñado por{" "}
              <span className="relative font-semibold tracking-wide text-pc-sand-100/70 transition-colors duration-300 group-hover:text-white">
                ASWEN GROUP
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-pc-green-400 to-pc-blue-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
