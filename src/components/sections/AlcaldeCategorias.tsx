"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categoryMeta, records, type RecordCategory } from "@/data/alcaldia";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export default function AlcaldeCategorias() {
  const categories = Object.entries(categoryMeta) as [RecordCategory, (typeof categoryMeta)[RecordCategory]][];

  return (
    <section className="bg-pc-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Áreas de gestión"
          title="Seis frentes de trabajo"
          subtitle="Cada proyecto y acción está clasificado en una de estas categorías, tal como se reportó."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([id, meta], i) => {
            const count = records.filter((rec) => rec.category === id).length;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <Link
                  href={`/gestion-alcalde?categoria=${id}#explorador`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className={cn("relative flex h-24 items-center justify-between bg-gradient-to-br px-5", meta.gradient)}>
                    <meta.icon className="size-8 text-white" />
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {count} {count === 1 ? "registro" : "registros"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-base font-bold text-foreground">{meta.label}</h3>
                    <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{meta.description}</p>
                    <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-pc-green-700">
                      Ver proyectos
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
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
