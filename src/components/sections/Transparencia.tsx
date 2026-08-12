"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { transparencyItems, executionByQuarter } from "@/data/transparency";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Transparencia() {
  return (
    <section className="bg-pc-green-950 py-20 sm:py-28" id="transparencia-preview">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Datos abiertos"
            title="Municipalidad transparente"
            subtitle="Información clara y verificable sobre el uso de los recursos públicos."
            tone="dark"
          />
          <Link
            href="/transparencia"
            className="group hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-pc-green-800 transition hover:bg-pc-amber-400 sm:flex"
          >
            Explorar transparencia
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {transparencyItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-pc-green-500/20 text-pc-green-300">
                  <item.icon className="size-5" />
                </span>
                <p className="mt-4 font-heading text-xl font-bold text-white">{item.value}</p>
                <p className="text-sm font-medium text-pc-green-100">{item.title}</p>
                <p className="mt-0.5 text-xs text-white/50">{item.hint}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-sm font-semibold text-white">Ejecución presupuestaria</p>
            <p className="text-xs text-white/50">Porcentaje ejecutado por trimestre, 2026</p>
            <div className="mt-6 flex flex-1 items-end justify-between gap-3">
              {executionByQuarter.map((bar, i) => (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-32 w-full items-end overflow-hidden rounded-lg bg-white/5">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      className="w-full rounded-lg bg-gradient-to-t from-pc-green-600 to-pc-green-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-white/70">{bar.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <Link
          href="/transparencia"
          className="mx-auto mt-8 flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-pc-green-800 sm:hidden"
        >
          Explorar transparencia
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
