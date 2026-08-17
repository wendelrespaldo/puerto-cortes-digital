"use client";

import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, HardHat, Gavel, ShieldCheck, Users2, Wallet } from "lucide-react";
import { getDashboardStats } from "@/data/alcaldia";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import AlcaldeCategoryChart from "@/components/sections/AlcaldeCategoryChart";
import AlcaldeStatusChart from "@/components/sections/AlcaldeStatusChart";
import AlcaldePresentationMode from "@/components/sections/AlcaldePresentationMode";

export default function AlcaldeDashboard() {
  const stats = getDashboardStats();

  const tiles = [
    { id: "total", icon: BarChart3, label: "Proyectos y acciones", value: stats.total, hint: "Registrados en este portal" },
    { id: "finalizados", icon: CheckCircle2, label: "Finalizados", value: stats.finalizados, hint: "Entregados a la comunidad" },
    { id: "ejecucion", icon: HardHat, label: "En ejecución", value: stats.enEjecucion, hint: "Avanzando actualmente" },
    { id: "licitacion", icon: Gavel, label: "En licitación", value: stats.enLicitacion, hint: "En proceso de contratación" },
    {
      id: "aprobados",
      icon: ShieldCheck,
      label: "Aprobados",
      value: stats.aprobados,
      hint: `+ ${stats.aprobadosConTransferencia - stats.aprobados} en la Transferencia No. 4`,
    },
    { id: "comunidades", icon: Users2, label: "Comunidades beneficiadas", value: stats.comunidades, hint: "En todo el municipio" },
  ];

  return (
    <section className="relative overflow-hidden bg-pc-navy-950 py-16 sm:py-24" id="dashboard">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 size-96 animate-blob bg-pc-green-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 size-80 animate-blob bg-pc-blue-400/10 blur-3xl"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pr-24">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div className="mx-auto max-w-2xl sm:mx-0">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-amber-400 uppercase">
              <BarChart3 className="size-3.5" />
              Transparencia y rendición de cuentas
            </span>
            <h2 className="font-heading text-2xl font-bold text-white text-balance sm:text-4xl">
              La gestión, en vivo
            </h2>
            <p className="mt-2 text-sm text-white/60 sm:text-base">
              Dashboard actualizado con cada proyecto y acción registrada.
            </p>
          </div>
          <AlcaldePresentationMode />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {tiles.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-colors duration-300 hover:border-pc-green-400/30 hover:bg-white/10"
            >
              <stat.icon className="mx-auto mb-2 size-5 text-pc-green-300 transition-transform duration-300 group-hover:scale-110" />
              <AnimatedCounter
                value={stat.value}
                className="block font-heading text-2xl font-bold text-white sm:text-3xl"
              />
              <p className="mt-1.5 text-xs font-medium text-pc-green-100 sm:text-sm">{stat.label}</p>
              <p className="mt-1 text-[11px] text-white/40">{stat.hint}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: tiles.length * 0.06 }}
            whileHover={{ y: -3 }}
            className="col-span-2 rounded-2xl border border-pc-amber-400/30 bg-pc-amber-400/10 p-5 text-center backdrop-blur-sm sm:col-span-1"
          >
            <Wallet className="mx-auto mb-2 size-5 text-pc-amber-400" />
            <span className="block font-heading text-2xl font-bold text-white sm:text-3xl">
              {stats.inversionAprobadaDisplay}
            </span>
            <p className="mt-1.5 text-xs font-medium text-pc-amber-400 sm:text-sm">Inversión aprobada</p>
            <p className="mt-1 text-[11px] text-white/70">Transferencia Presupuestaria No. 4</p>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AlcaldeCategoryChart />
          <AlcaldeStatusChart />
        </div>
      </div>
    </section>
  );
}
