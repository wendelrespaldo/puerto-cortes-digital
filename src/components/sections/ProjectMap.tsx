"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HardHat, School, Dumbbell, TrafficCone, X, MapPin } from "lucide-react";
import { projects, statusLabels, type Project } from "@/data/projects";
import SectionHeading from "@/components/shared/SectionHeading";
import ProgressBar from "@/components/shared/ProgressBar";
import { cn } from "@/lib/utils";

const categoryMeta: Record<
  Project["category"],
  { icon: typeof HardHat; label: string; color: string }
> = {
  obras: { icon: HardHat, label: "Obras", color: "bg-pc-amber-500" },
  educacion: { icon: School, label: "Educación", color: "bg-pc-blue-500" },
  deporte: { icon: Dumbbell, label: "Deporte", color: "bg-pc-coral-500" },
  infraestructura: { icon: TrafficCone, label: "Infraestructura", color: "bg-pc-green-500" },
};

export default function ProjectMap() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="mapa-obras" className="bg-pc-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Mapa interactivo"
          title="Obras cerca de ti"
          subtitle="Explora el territorio y descubre qué proyectos se están ejecutando en cada sector."
        />

        <div className="mt-4 flex flex-wrap gap-2.5">
          {Object.entries(categoryMeta).map(([key, meta]) => (
            <span
              key={key}
              className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground/70"
            >
              <span className={cn("flex size-4 items-center justify-center rounded-full text-white", meta.color)}>
                <meta.icon className="size-2.5" />
              </span>
              {meta.label}
            </span>
          ))}
        </div>

        <div className="relative mt-8 aspect-16/9 w-full overflow-hidden rounded-3xl border border-border shadow-lg sm:aspect-21/9">
          <Image
            src="/images/municipalidad/palacio-municipal-2.jpg"
            alt="Vista aérea de referencia de Puerto Cortés"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pc-green-950/70 via-pc-navy-950/50 to-pc-blue-950/60" />
          <svg
            className="absolute inset-0 h-full w-full opacity-25"
            aria-hidden
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line x1="0" y1="30" x2="100" y2="34" stroke="white" strokeWidth="0.4" />
            <line x1="0" y1="62" x2="100" y2="58" stroke="white" strokeWidth="0.4" />
            <line x1="20" y1="0" x2="24" y2="100" stroke="white" strokeWidth="0.4" />
            <line x1="55" y1="0" x2="60" y2="100" stroke="white" strokeWidth="0.4" />
            <line x1="80" y1="0" x2="78" y2="100" stroke="white" strokeWidth="0.4" />
          </svg>

          {projects.map((project) => {
            const meta = categoryMeta[project.category];
            const isSelected = selected?.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setSelected(isSelected ? null : project)}
                aria-label={project.name}
                style={{ left: `${project.coords.x}%`, top: `${project.coords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className={cn(
                    "relative flex size-9 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white/30 transition-transform hover:scale-110",
                    meta.color,
                    isSelected && "scale-125 ring-white/70"
                  )}
                >
                  <meta.icon className="size-4" />
                  <span className={cn("absolute inset-0 -z-10 animate-ping rounded-full opacity-40", meta.color)} />
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
                  onClick={() => setSelected(null)}
                  aria-label="Cerrar"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {selected.location}
                </p>
                <h4 className="mt-1 pr-5 font-heading text-sm font-bold text-foreground">
                  {selected.name}
                </h4>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-pc-green-700">{selected.investment}</span>
                  <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
                    <span className={cn("size-1.5 rounded-full", statusLabels[selected.status].dot)} />
                    {statusLabels[selected.status].label}
                  </span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={selected.progress} className="h-1.5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
