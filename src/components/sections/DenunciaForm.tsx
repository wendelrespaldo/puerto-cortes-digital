"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const categories = ["Infraestructura", "Desechos sólidos", "Ruido", "Agua", "Otro"];

export default function DenunciaForm() {
  const [sent, setSent] = useState(false);
  const [folio, setFolio] = useState("");

  return (
    <section className="bg-white py-20" id="denuncias">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Denuncias ciudadanas"
          title="Reporta una situación"
          subtitle="Tu reporte es confidencial y recibe seguimiento por parte de la municipalidad."
          align="center"
        />

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col items-center rounded-3xl border border-pc-green-200 bg-pc-green-50 p-10 text-center"
            >
              <CheckCircle2 className="size-12 text-pc-green-600" />
              <p className="mt-4 font-heading text-lg font-bold text-pc-green-800">
                Denuncia enviada
              </p>
              <p className="mt-1 max-w-sm text-sm text-pc-green-700/80">
                Hemos recibido tu reporte con el folio{" "}
                <strong>PC-DEN-{folio}</strong>. Te
                contactaremos si necesitamos más información.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-5 rounded-full border border-pc-green-300 px-5 py-2 text-sm font-semibold text-pc-green-800 hover:bg-white"
              >
                Enviar otra denuncia
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
                setFolio(String(Math.floor(1000 + Math.random() * 9000)));
                setSent(true);
              }}
              className="mt-8 space-y-4 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Categoría
                </label>
                <select
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-pc-green-400"
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Ubicación
                </label>
                <input
                  required
                  placeholder="Barrio, colonia o punto de referencia"
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-pc-green-400"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Describe la situación
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntanos qué está pasando..."
                  className="w-full resize-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-pc-green-400"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-pc-coral-600 py-3 text-sm font-semibold text-white transition hover:bg-pc-coral-700"
              >
                <Megaphone className="size-4.5" />
                Enviar denuncia
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
