"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const services = [
  "Poda de árbol",
  "Bacheo de calle",
  "Reparación de alumbrado",
  "Limpieza de canal",
  "Otro servicio",
];

export default function SolicitudServicio() {
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-pc-sand-50 py-20" id="solicitud">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Solicitudes"
          title="Solicitar un servicio"
          subtitle="Pide una gestión concreta a la municipalidad y da seguimiento a su avance."
          align="center"
        />

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col items-center rounded-3xl border border-pc-blue-200 bg-pc-blue-100/60 p-10 text-center"
            >
              <CheckCircle2 className="size-12 text-pc-blue-600" />
              <p className="mt-4 font-heading text-lg font-bold text-pc-blue-800">
                Solicitud enviada
              </p>
              <p className="mt-1 max-w-sm text-sm text-pc-blue-700/80">
                Puedes dar seguimiento a esta solicitud desde tu Portal Ciudadano.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-5 rounded-full border border-pc-blue-300 px-5 py-2 text-sm font-semibold text-pc-blue-800 hover:bg-white"
              >
                Enviar otra solicitud
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-8 space-y-4 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Tipo de servicio
                </label>
                <select
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-pc-blue-400"
                >
                  <option value="" disabled>
                    Selecciona un servicio
                  </option>
                  {services.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Nombre completo"
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-pc-blue-400"
                />
                <input
                  required
                  placeholder="Teléfono de contacto"
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-pc-blue-400"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="Describe tu solicitud..."
                className="w-full resize-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-pc-blue-400"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-pc-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-pc-blue-700"
              >
                <Send className="size-4.5" />
                Enviar solicitud
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
