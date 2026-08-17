"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { getFeaturedRecords, categoryMeta, statusMeta } from "@/data/alcaldia";
import SectionHeading from "@/components/shared/SectionHeading";
import ProgressBar from "@/components/shared/ProgressBar";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { cn } from "@/lib/utils";

export default function Obras() {
  const featured = getFeaturedRecords().slice(0, 3);

  return (
    <section className="bg-pc-navy-950 py-20 sm:py-28" id="obras">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Inversión pública"
            title="Puerto Cortés se transforma"
            subtitle="Da seguimiento a las obras y proyectos que están cambiando la ciudad, barrio por barrio."
            tone="dark"
          />
          <Link
            href="/gestion-alcalde"
            className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-pc-navy-900 transition hover:bg-pc-amber-400"
          >
            Ver toda la gestión
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((rec, i) => {
            const category = categoryMeta[rec.category];
            const status = statusMeta[rec.status];
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group overflow-hidden rounded-3xl bg-pc-navy-800/60 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pc-green-950/40 hover:ring-pc-green-400/40"
              >
                <Link href="/gestion-alcalde" className="block">
                  <div className={cn("relative flex h-40 items-end bg-gradient-to-br p-4", category.gradient)}>
                    <category.icon className="absolute -right-3 -top-3 size-20 text-white/10" />
                    <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <span className={cn("size-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-1.5 text-xs text-white/50">
                      <MapPin className="size-3.5" />
                      {rec.community}
                    </p>
                    <h3 className="mt-1.5 font-heading text-base font-bold text-white">{rec.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-pc-amber-400">{rec.investment}</p>

                    <div className="grid grid-rows-[0fr] overflow-hidden transition-all duration-300 group-hover:mt-2 group-hover:grid-rows-[1fr]">
                      <p className="min-h-0 text-xs leading-relaxed text-white/60">{rec.description}</p>
                    </div>

                    {rec.progress !== null && (
                      <div className="mt-4">
                        <div className="mb-1.5 flex items-center justify-between text-xs text-white/60">
                          <span>Avance</span>
                          <AnimatedCounter value={rec.progress} suffix="%" className="font-semibold text-white" />
                        </div>
                        <ProgressBar value={rec.progress} className="bg-white/10" />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
