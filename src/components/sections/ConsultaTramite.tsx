"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Clock, FileCheck2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  { label: "Solicitud recibida", icon: FileCheck2 },
  { label: "En revisión municipal", icon: Clock },
  { label: "Listo para retirar", icon: CheckCircle2 },
];

export default function ConsultaTramite() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | { code: string; step: number }>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    const step = (code.trim().length % 3) as 0 | 1 | 2;
    setResult({ code: code.trim().toUpperCase(), step });
  }

  return (
    <section className="bg-pc-sand-50 py-20" id="consulta">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Seguimiento"
          title="Consulta de trámite"
          subtitle="Ingresa tu número de expediente para ver el estado actual de tu solicitud."
          align="center"
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-2xl border border-border bg-white p-2 pl-5 shadow-sm"
        >
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ej. PC-2026-00456"
            aria-label="Número de expediente"
            className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            className="rounded-xl bg-pc-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pc-green-800"
          >
            Consultar
          </button>
        </form>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.code}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-8 max-w-lg rounded-3xl border border-border bg-white p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Expediente</p>
                <span className="rounded-full bg-pc-green-100 px-3 py-1 text-xs font-bold text-pc-green-700">
                  {result.code}
                </span>
              </div>
              <div className="mt-6 space-y-5">
                {steps.map((step, i) => {
                  const done = i <= result.step;
                  return (
                    <div key={step.label} className="flex items-center gap-3">
                      <span
                        className={
                          "flex size-9 items-center justify-center rounded-full " +
                          (done
                            ? "bg-pc-green-600 text-white"
                            : "bg-muted text-muted-foreground")
                        }
                      >
                        <step.icon className="size-4.5" />
                      </span>
                      <span
                        className={
                          "text-sm font-medium " +
                          (done ? "text-foreground" : "text-muted-foreground")
                        }
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
