"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Radio } from "lucide-react";
import { getDashboardStats } from "@/data/alcaldia";

export default function AlcaldeHero({
  intro,
}: {
  intro: string;
}) {
  const stats = getDashboardStats();

  return (
    <section className="relative overflow-hidden bg-pc-navy-950 pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-80 animate-blob bg-pc-green-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-16 bottom-0 size-64 animate-blob bg-pc-blue-400/10 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex items-center gap-1.5 text-xs text-white/50"
        >
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white/80">Gestión del Alcalde</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-4 flex flex-wrap items-center gap-2.5"
        >
          <span className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-amber-400 uppercase">
            Gestión del Alcalde
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pc-green-500/15 px-3.5 py-1 text-xs font-semibold text-pc-green-200">
            <Radio className="size-3 animate-pulse" />
            {stats.total} proyectos y acciones en seguimiento
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="flex items-center gap-4 sm:gap-5"
        >
          <Image
            src="/images/logo/escudo-pc.png"
            alt="Escudo de la Municipalidad de Puerto Cortés"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 object-contain sm:h-18 sm:w-18"
            priority
          />
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl">
            Giancarlo Rodríguez
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 text-balance sm:text-lg"
        >
          {intro}
        </motion.p>
      </div>
    </section>
  );
}
