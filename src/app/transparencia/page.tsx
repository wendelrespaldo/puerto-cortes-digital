import type { Metadata } from "next";
import { FileText, Download, Map } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import Transparencia from "@/components/sections/Transparencia";
import MunicipalSystems from "@/components/sections/MunicipalSystems";
import ComingSoonButton from "@/components/shared/ComingSoonButton";

export const metadata: Metadata = {
  title: "Transparencia — Puerto Cortés Digital",
};

const contrataciones = [
  { title: "Suministro de tubería PVC — Sistema de agua", status: "Adjudicado", date: "2026-07-18" },
  { title: "Construcción de aceras — Barrio El Centro", status: "En proceso", date: "2026-08-02" },
  { title: "Compra de equipo — Cuerpo de Bomberos", status: "Publicado", date: "2026-08-09" },
];

const documentos = [
  "Plan de arbitrios 2026",
  "Presupuesto municipal 2026",
  "Actas de Corporación Municipal",
  "Informe de rendición de cuentas 2025",
];

export default function TransparenciaPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Municipalidad transparente"
        subtitle="Datos abiertos sobre presupuesto, contrataciones y ejecución de obra pública."
      />
      <Transparencia />

      <section id="contrataciones" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Compras públicas" title="Contrataciones recientes" />
          <div className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border">
            {contrataciones.map((c) => (
              <div key={c.title} className="flex flex-col gap-2 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-foreground/90">{c.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Publicado el {new Date(c.date + "T12:00:00").toLocaleDateString("es-HN", { day: "numeric", month: "long" })}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-pc-green-100 px-3 py-1 text-xs font-semibold text-pc-green-700">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="arbitrios" className="scroll-mt-20 bg-pc-sand-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            eyebrow="Normativa vigente"
            title="Plan de arbitrios"
            subtitle="Consulta las tasas y tributos municipales vigentes para el presente año."
            align="center"
          />
          <ComingSoonButton className="mt-6 inline-flex items-center gap-2 rounded-full bg-pc-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-pc-green-800">
            <Download className="size-4.5" />
            Descargar Plan de Arbitrios 2026
          </ComingSoonButton>
        </div>
      </section>

      <section id="documentos" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Documentos" title="Documentos públicos" align="center" />
          <div className="mx-auto mt-8 max-w-2xl divide-y divide-border overflow-hidden rounded-3xl border border-border">
            {documentos.map((d) => (
              <ComingSoonButton
                key={d}
                className="flex w-full items-center justify-between gap-4 bg-white px-6 py-4 text-left transition hover:bg-pc-green-50"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-foreground/85">
                  <FileText className="size-4.5 text-pc-green-600" />
                  {d}
                </span>
                <span className="text-xs font-semibold text-pc-green-700">Descargar</span>
              </ComingSoonButton>
            ))}
          </div>
        </div>
      </section>

      <section id="geografia" className="scroll-mt-20 bg-pc-sand-50 py-20 text-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-pc-blue-100 text-pc-blue-700">
            <Map className="size-7" />
          </span>
          <SectionHeading
            eyebrow="Información geográfica"
            title="Mapas y datos territoriales"
            subtitle="Consulta la información geográfica oficial de Puerto Cortés, disponible próximamente en este portal."
            align="center"
            className="mt-5"
          />
        </div>
      </section>

      <MunicipalSystems />
    </>
  );
}
