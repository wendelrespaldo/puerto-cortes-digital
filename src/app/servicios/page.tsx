import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Truck, Droplets, Flame } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import SolicitudServicio from "@/components/sections/SolicitudServicio";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Servicios municipales — Puerto Cortés Digital",
};

const detailSections = [
  {
    id: "agua",
    icon: Droplets,
    title: "Agua y saneamiento",
    color: "text-pc-blue-600 bg-pc-blue-100",
    description:
      "Gestiona tu conexión de agua potable, reporta fugas y consulta tu facturación del servicio.",
    points: ["Nueva conexión domiciliar", "Reporte de fugas y daños", "Consulta de facturación"],
  },
  {
    id: "recoleccion",
    icon: Truck,
    title: "Recolección de desechos",
    color: "text-pc-green-600 bg-pc-green-100",
    description:
      "Consulta los días y horarios de recolección según tu sector, y reporta rutas incompletas.",
    points: ["Rutas 1 a 12 — lunes a sábado", "Recolección especial de escombros", "Reporte de ruta incompleta"],
  },
  {
    id: "bomberos",
    icon: Flame,
    title: "Bomberos",
    color: "text-pc-coral-600 bg-pc-coral-500/10",
    description:
      "Atención de emergencias, inspecciones de seguridad y campañas de prevención de incendios.",
    points: ["Línea de emergencia 24/7", "Inspecciones de seguridad", "Capacitación comunitaria"],
  },
];

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Servicios municipales"
        subtitle="Consulta, solicita y da seguimiento a los servicios que ofrece tu municipalidad."
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Catálogo" title="Todos los servicios" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group flex flex-col rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-pc-green-100 text-pc-green-700">
                  <service.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold">{service.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{service.description}</p>
                <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-pc-green-700">
                  Ver detalle
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {detailSections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-20 py-20 ${i % 2 === 0 ? "bg-pc-sand-50" : "bg-white"}`}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className={`flex size-14 items-center justify-center rounded-2xl ${section.color}`}>
              <section.icon className="size-7" />
            </span>
            <h2 className="mt-5 font-heading text-2xl font-bold sm:text-3xl">{section.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{section.description}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {section.points.map((p) => (
                <li
                  key={p}
                  className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground/80"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <SolicitudServicio />
    </>
  );
}
