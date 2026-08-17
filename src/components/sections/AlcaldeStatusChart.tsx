"use client";

import { motion } from "framer-motion";
import { getStatusBreakdown, getDashboardStats } from "@/data/alcaldia";

export default function AlcaldeStatusChart() {
  const breakdown = getStatusBreakdown();
  const stats = getDashboardStats();
  const max = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
      <p className="text-sm font-semibold text-white">Ciclo de vida de los proyectos</p>
      <p className="text-xs text-white/50">De la planificación a la entrega — {stats.total} registros</p>

      <div className="mt-6 flex items-end gap-2 sm:gap-3">
        {breakdown.map((item, i) => (
          <motion.div
            key={item.status}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group flex flex-1 flex-col items-center gap-2"
          >
            <span className="font-heading text-sm font-bold text-white">{item.count}</span>
            <div className="relative flex h-28 w-full items-end overflow-hidden rounded-lg bg-white/5 sm:h-36">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(item.count / max) * 100}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                className="w-full rounded-lg transition-[filter] duration-300 group-hover:brightness-110"
                style={{ backgroundColor: item.color }}
              />
            </div>
            <span className="text-center text-[10px] leading-tight text-white/60 sm:text-[11px]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
