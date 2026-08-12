"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Map as MapIcon } from "lucide-react";
import { projects, statusLabels } from "@/data/projects";
import SectionHeading from "@/components/shared/SectionHeading";
import ProgressBar from "@/components/shared/ProgressBar";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

export default function Obras() {
  const featured = projects.slice(0, 3);

  return (
    <section className="bg-pc-navy-950 py-20 sm:py-28" id="obras">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Inversión pública"
            title="Puerto Cortés se transforma"
            subtitle="Da seguimiento en tiempo real a las obras que están cambiando la ciudad, barrio por barrio."
            tone="dark"
          />
          <div className="flex shrink-0 gap-3">
            <Link
              href="/obras"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-pc-navy-900 transition hover:bg-pc-amber-400"
            >
              Ver todas las obras
            </Link>
            <a
              href="#mapa-obras"
              className="hidden items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:flex"
            >
              <MapIcon className="size-4" />
              Explorar mapa
            </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((project, i) => {
            const status = statusLabels[project.status];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group overflow-hidden rounded-3xl bg-pc-navy-800/60 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pc-green-950/40 hover:ring-pc-green-400/40"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pc-navy-950/90 via-pc-navy-950/10 to-transparent" />
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <span className={`size-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="flex items-center gap-1.5 text-xs text-white/70">
                      <MapPin className="size-3.5" />
                      {project.location}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-pc-amber-400">
                    {project.investment}
                  </p>

                  <div className="grid grid-rows-[0fr] overflow-hidden transition-all duration-300 group-hover:mt-2 group-hover:grid-rows-[1fr]">
                    <p className="min-h-0 text-xs leading-relaxed text-white/60">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-white/60">
                      <span>Avance de obra</span>
                      <AnimatedCounter
                        value={project.progress}
                        suffix="%"
                        className="font-semibold text-white"
                      />
                    </div>
                    <ProgressBar value={project.progress} className="bg-white/10" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <a
          href="#mapa-obras"
          className="mx-auto mt-8 flex w-fit items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:hidden"
        >
          <MapIcon className="size-4" />
          Explorar mapa
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
