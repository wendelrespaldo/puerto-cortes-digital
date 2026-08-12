"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { projects, statusLabels, type ProjectStatus } from "@/data/projects";
import ProgressBar from "@/components/shared/ProgressBar";
import { cn } from "@/lib/utils";

const filters: { id: ProjectStatus | "todas"; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "ejecucion", label: "En ejecución" },
  { id: "completada", label: "Completadas" },
  { id: "planificada", label: "Planificadas" },
];

export default function ObrasGrid() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("todas");

  const filtered = useMemo(
    () => (active === "todas" ? projects : projects.filter((p) => p.status === active)),
    [active]
  );

  return (
    <section className="bg-pc-sand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors",
                active === f.id
                  ? "bg-pc-green-700 text-white"
                  : "bg-white text-muted-foreground ring-1 ring-border hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => {
              const status = statusLabels[project.status];
              return (
                <div
                  key={project.id}
                  className="group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <span className={cn("size-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {project.location} · {project.sector}
                    </p>
                    <h3 className="mt-1.5 font-heading text-base font-bold text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{project.description}</p>
                    <p className="mt-3 text-sm font-semibold text-pc-green-700">
                      {project.investment}
                    </p>
                    <div className="mt-3">
                      <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Avance de obra</span>
                        <span className="font-semibold text-foreground">{project.progress}%</span>
                      </div>
                      <ProgressBar value={project.progress} />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
