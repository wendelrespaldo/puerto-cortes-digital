import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Landmark,
  TrendingUp,
  Leaf,
  Trophy,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import Programs from "@/components/sections/Programs";

export const metadata: Metadata = {
  title: "Municipalidad — Puerto Cortés Digital",
};

const pillars = [
  {
    id: "corporacion",
    icon: Landmark,
    title: "Corporación Municipal",
    description:
      "Órgano colegiado de gobierno local, integrado por el Alcalde, Vicealcalde y Regidores electos para el período 2026–2030.",
  },
  {
    id: "gestion",
    icon: Landmark,
    title: "Gestión Municipal",
    description:
      "Planificación estratégica, metas trimestrales e indicadores de cumplimiento de la administración actual.",
  },
  {
    id: "economico",
    icon: TrendingUp,
    title: "Desarrollo Económico",
    description:
      "Impulso a la inversión, el empleo local y el fortalecimiento del comercio y el sector portuario.",
  },
  {
    id: "ambiente",
    icon: Leaf,
    title: "Medio Ambiente",
    description:
      "Programas de arborización, manejo de desechos y protección de los recursos naturales del municipio.",
  },
  {
    id: "imdepor",
    icon: Trophy,
    title: "IMDEPOR",
    description:
      "Instituto Municipal de Deportes: fomenta la actividad física y recreativa en toda la comunidad porteña.",
  },
];

export default function MunicipalidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Municipalidad"
        title="Así se gobierna Puerto Cortés"
        subtitle="Conoce la estructura, gestión y prioridades de la administración municipal."
      />

      <section className="relative h-64 w-full overflow-hidden sm:h-96">
        <Image
          src="/images/municipalidad/palacio-municipal-1.jpg"
          alt="Palacio Municipal de Puerto Cortés"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
      </section>

      <section className="bg-pc-sand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-lg shadow-pc-green-950/5">
            <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
              <div className="relative flex items-center justify-center bg-gradient-to-br from-pc-green-700 via-pc-green-800 to-pc-navy-900 p-8 sm:p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 size-32 animate-blob bg-white/10"
                />
                <div className="relative flex size-28 items-center justify-center rounded-full bg-white/10 ring-4 ring-white/15 sm:size-32">
                  <span className="font-heading text-4xl font-bold text-white">GR</span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-pc-green-100 px-3 py-1 text-xs font-semibold tracking-wide text-pc-green-700 uppercase">
                  <BadgeCheck className="size-3.5" />
                  Alcalde Municipal
                </span>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Giancarlo Rodríguez
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Al frente de una gestión comprometida con la transparencia, la
                  inversión pública y un municipio cada vez más cercano a su gente.
                </p>
                <Link
                  href="#gestion"
                  className="group mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-pc-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pc-green-800"
                >
                  Conocer la gestión
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Institución" title="Cómo funciona la municipalidad" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.id}
                id={p.id}
                className="scroll-mt-24 rounded-3xl border border-border bg-white p-6 shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-pc-green-100 text-pc-green-700">
                  <p.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programas" className="scroll-mt-20">
        <Programs />
      </section>

      <section id="contacto" className="scroll-mt-20 bg-pc-navy-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contacto"
            title="Directorio y canales oficiales"
            tone="dark"
            align="center"
          />
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: Phone, label: "Teléfono", value: "(504) 2755-2560" },
              { icon: Mail, label: "Correo", value: "info@ampuertocortes.hn" },
              { icon: MapPin, label: "Dirección", value: "Barrio la Curva, Puerto Cortés" },
              { icon: Clock, label: "Horario", value: "Lunes a viernes, 8:00 a.m. – 4:00 p.m." },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <c.icon className="mt-0.5 size-5 shrink-0 text-pc-green-300" />
                <div>
                  <p className="text-xs text-white/50">{c.label}</p>
                  <p className="text-sm font-medium text-white">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
