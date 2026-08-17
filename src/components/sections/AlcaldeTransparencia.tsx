"use client";

import { useState } from "react";
import { Landmark, CheckCircle2, AlertTriangle } from "lucide-react";
import { transferBudget } from "@/data/alcaldia";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export default function AlcaldeTransparencia() {
  const [onlyDuplicates, setOnlyDuplicates] = useState(false);
  const projects = onlyDuplicates
    ? transferBudget.projects.filter((p) => p.possibleDuplicateOf)
    : transferBudget.projects;

  return (
    <section id="transparencia" className="scroll-mt-20 bg-pc-green-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Inversión y transparencia"
          title={transferBudget.numberLabel}
          subtitle={`${transferBudget.session} — ${transferBudget.approvalNote}, para la ejecución de la siguiente cartera de proyectos.`}
          tone="dark"
        />

        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-pc-amber-400/20 text-pc-amber-400">
              <Landmark className="size-5" />
            </span>
            <div>
              <p className="text-xs text-white/50">Monto total aprobado</p>
              <p className="font-heading text-2xl font-bold text-white">{transferBudget.totalAmountDisplay}</p>
            </div>
          </div>
          <p className="max-w-md text-xs text-white/50">
            Los montos individuales por proyecto no fueron especificados en el acta original — solo el monto total
            de la transferencia.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-white/50">{projects.length} de {transferBudget.projects.length} proyectos</p>
          <button
            onClick={() => setOnlyDuplicates((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
              onlyDuplicates ? "bg-pc-amber-400 text-pc-navy-950" : "bg-white/10 text-white/70 hover:bg-white/15"
            )}
          >
            <AlertTriangle className="size-3.5" />
            Solo posibles duplicados
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
          <div className="max-h-[32rem] overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-pc-green-950">
                <tr className="border-b border-white/10 text-xs tracking-wide text-white/50 uppercase">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Proyecto</th>
                  <th className="px-4 py-3 font-semibold">Comunidad / sector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((p, i) => (
                  <tr key={p.id} className="align-top hover:bg-white/5">
                    <td className="px-4 py-3 text-white/40">{i + 1}</td>
                    <td className="px-4 py-3 text-white/90">
                      {p.title}
                      {p.possibleDuplicateOf && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-pc-amber-400/15 px-2 py-0.5 text-[10px] font-semibold text-pc-amber-400">
                          <AlertTriangle className="size-3" />
                          posible duplicado de {p.possibleDuplicateOf}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white/60">{p.community}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-xs text-white/40">
          <CheckCircle2 className="size-3.5" />
          Aprobado por unanimidad por la Corporación Municipal.
        </p>
      </div>
    </section>
  );
}
