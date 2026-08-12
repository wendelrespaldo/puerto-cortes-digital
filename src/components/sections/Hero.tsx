"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Wallet, FileText, Send, ClipboardCheck } from "lucide-react";
import { useSearch } from "@/components/shared/SearchProvider";

const quickLinks = [
  { label: "Pagar impuestos", icon: Wallet, href: "/tramites#pagos" },
  { label: "Trámites", icon: FileText, href: "/tramites" },
  { label: "Solicitar servicio", icon: Send, href: "/servicios#solicitud" },
  { label: "Consultar trámite", icon: ClipboardCheck, href: "/tramites#consulta" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const { openSearch } = useSearch();

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden bg-pc-navy-950">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/hero/hero-ciudad-mar.jpg"
          alt="Vista aérea de Puerto Cortés hacia el mar Caribe"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-pc-navy-950/80 via-pc-navy-950/55 to-pc-navy-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-pc-green-950/70 via-transparent to-pc-navy-950/40" />

      {/* subtle floating shapes */}
      <div
        aria-hidden
        className="absolute -left-24 top-16 size-72 animate-blob bg-pc-green-500/20 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -right-20 bottom-10 size-96 animate-blob bg-pc-blue-400/15 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div aria-hidden className="absolute left-1/4 top-1/3 size-2 animate-float rounded-full bg-white/40" />
      <div aria-hidden className="absolute right-1/3 top-1/2 size-1.5 animate-float-delay rounded-full bg-pc-amber-400/70" />
      <div aria-hidden className="absolute left-2/3 top-1/4 size-1 animate-float rounded-full bg-white/50" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-pc-green-100 uppercase backdrop-blur-sm"
        >
          Puerto Cortés Digital
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="max-w-3xl font-heading text-4xl font-extrabold tracking-tight text-white text-balance sm:text-6xl lg:text-7xl"
        >
          Puerto Cortés <span className="text-pc-green-300">es primero</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-5 max-w-xl text-base text-white/80 text-balance sm:text-lg"
        >
          Tu municipio, tus servicios y toda la información que necesitas,
          ahora en un solo lugar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-9 max-w-2xl"
        >
          <p className="mb-2.5 text-sm font-medium text-white/70">¿Qué necesitas hacer?</p>
          <button
            onClick={() => openSearch()}
            className="group flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/95 p-2 pl-5 text-left shadow-2xl shadow-black/30 backdrop-blur-md transition hover:bg-white sm:p-2.5 sm:pl-6"
          >
            <Search className="size-5 shrink-0 text-pc-green-600" />
            <span className="flex-1 truncate text-sm text-muted-foreground sm:text-base">
              Busca un trámite, servicio, noticia o información...
            </span>
            <span className="hidden shrink-0 items-center rounded-xl bg-pc-green-700 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-pc-green-800 sm:flex">
              Buscar
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-5 flex flex-wrap gap-2.5"
        >
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:border-pc-amber-400/60 hover:bg-pc-amber-400/15"
            >
              <link.icon className="size-4 text-pc-amber-400" />
              {link.label}
            </Link>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
