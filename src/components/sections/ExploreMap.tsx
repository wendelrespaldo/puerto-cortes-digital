"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPinned, X } from "lucide-react";
import { tourismCategories } from "@/data/tourism";
import { cn } from "@/lib/utils";

// Posiciones ilustrativas sobre el mapa — no representan coordenadas GPS reales.
const markerPositions: Record<string, { x: number; y: number }> = {
  playas: { x: 20, y: 62 },
  naturaleza: { x: 68, y: 30 },
  puerto: { x: 82, y: 68 },
  cultura: { x: 44, y: 48 },
  gastronomia: { x: 58, y: 72 },
  eventos: { x: 30, y: 38 },
};

export default function ExploreMap() {
  const [active, setActive] = useState<string | null>(null);
  const items = tourismCategories.filter((c) => markerPositions[c.id]);
  const selected = items.find((c) => c.id === active);

  return (
    <section className="bg-pc-sand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-pc-blue-100 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-blue-700 uppercase">
            <MapPinned className="size-3.5" />
            Explora el mapa
          </span>
          <h2 className="font-heading text-2xl font-bold text-foreground text-balance sm:text-3xl">
            Puerto Cortés, punto por punto
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Una vista ilustrativa de dónde vivir cada experiencia. Ubicaciones exactas, próximamente.
          </p>
        </div>

        <div className="relative mt-10 aspect-16/10 w-full overflow-hidden rounded-3xl border border-border shadow-lg sm:aspect-21/9">
          <Image
            src="/images/hero/hero-ciudad-mar.jpg"
            alt="Vista aérea de referencia de Puerto Cortés"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pc-blue-950/70 via-pc-navy-950/50 to-pc-green-950/60" />
          <svg
            className="absolute inset-0 h-full w-full opacity-20"
            aria-hidden
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line x1="0" y1="35" x2="100" y2="38" stroke="white" strokeWidth="0.3" />
            <line x1="0" y1="65" x2="100" y2="60" stroke="white" strokeWidth="0.3" />
            <line x1="30" y1="0" x2="34" y2="100" stroke="white" strokeWidth="0.3" />
            <line x1="65" y1="0" x2="68" y2="100" stroke="white" strokeWidth="0.3" />
          </svg>

          {items.map((cat) => {
            const pos = markerPositions[cat.id];
            const isSelected = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(isSelected ? null : cat.id)}
                aria-label={cat.title}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className={cn(
                    "relative flex size-10 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white/30 transition-transform hover:scale-110",
                    "bg-gradient-to-br",
                    cat.gradient,
                    isSelected && "scale-125 ring-white/70"
                  )}
                >
                  <cat.icon className="size-4.5" />
                </span>
              </button>
            );
          })}

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-4 right-4 max-w-sm rounded-2xl bg-white p-4 shadow-2xl sm:left-6 sm:right-auto"
              >
                <button
                  onClick={() => setActive(null)}
                  aria-label="Cerrar"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
                <p className="pr-5 font-heading text-sm font-bold text-foreground">
                  {selected.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{selected.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
