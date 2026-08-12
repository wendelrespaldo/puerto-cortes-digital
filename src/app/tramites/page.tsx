import type { Metadata } from "next";
import Link from "next/link";
import { FileText, FileSpreadsheet, ClipboardCheck, Wallet, Home, Store } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import ConsultaTramite from "@/components/sections/ConsultaTramite";
import DenunciaForm from "@/components/sections/DenunciaForm";
import VoiceSection from "@/components/sections/VoiceSection";
import CitizenDashboard from "@/components/sections/CitizenDashboard";

export const metadata: Metadata = {
  title: "Trámites y permisos — Puerto Cortés Digital",
};

const tramites = [
  {
    icon: Wallet,
    title: "Pago de bienes inmuebles",
    detail: "Calcula y paga tu impuesto municipal anual.",
    id: "pagos",
  },
  {
    icon: Home,
    title: "Permiso de construcción",
    detail: "Solicita autorización para obra nueva o remodelación.",
    id: "permisos",
  },
  {
    icon: Store,
    title: "Permiso de operación de negocio",
    detail: "Registra o renueva tu negocio ante la municipalidad.",
    id: "permisos-negocio",
  },
  {
    icon: FileText,
    title: "Solvencia municipal",
    detail: "Constancia de que no tienes deudas pendientes.",
    id: "solvencia",
  },
];

const requisitos = [
  {
    title: "Solvencia municipal",
    items: ["Copia de identidad", "Número de cuenta o clave catastral", "Recibo de pago anterior"],
  },
  {
    title: "Permiso de construcción",
    items: ["Planos del proyecto", "Escritura o constancia de posesión", "Solvencia municipal vigente"],
  },
  {
    title: "Permiso de operación",
    items: ["Identidad del propietario", "RTN", "Croquis de ubicación del negocio"],
  },
];

const formularios = [
  "Solicitud de solvencia municipal",
  "Solicitud de permiso de construcción",
  "Registro de negocio",
  "Formulario de denuncia ciudadana",
];

export default function TramitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Trámites"
        title="Trámites y permisos"
        subtitle="Todo lo que necesitas para completar una gestión municipal, explicado de forma simple."
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Gestiones frecuentes" title="¿Qué trámite necesitas?" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tramites.map((t) => (
              <div
                key={t.title}
                id={t.id}
                className="scroll-mt-24 rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-pc-green-100 text-pc-green-700">
                  <t.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="requisitos" className="scroll-mt-20 bg-pc-sand-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Antes de iniciar" title="Requisitos" />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {requisitos.map((r) => (
              <div key={r.title} className="rounded-3xl border border-border bg-white p-6">
                <h3 className="font-heading text-base font-bold text-pc-green-800">{r.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                      <ClipboardCheck className="mt-0.5 size-4 shrink-0 text-pc-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultaTramite />

      <section id="formularios" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Descargables" title="Formularios" align="center" />
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border overflow-hidden rounded-3xl border border-border">
            {formularios.map((f) => (
              <Link
                key={f}
                href="#"
                className="flex items-center justify-between gap-4 bg-white px-6 py-4 transition hover:bg-pc-green-50"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-foreground/85">
                  <FileSpreadsheet className="size-4.5 text-pc-green-600" />
                  {f}
                </span>
                <span className="text-xs font-semibold text-pc-green-700">Descargar PDF</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DenunciaForm />
      <VoiceSection />
      <CitizenDashboard />
    </>
  );
}
