"use client";

import { motion } from "framer-motion";
import { getCategoryBreakdown } from "@/data/alcaldia";

export default function AlcaldeCategoryChart() {
  const breakdown = getCategoryBreakdown();
  const max = Math.max(...breakdown.map((b) => b.count));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
      <p className="text-sm font-semibold text-white">Proyectos por categoría</p>
      <p className="text-xs text-white/50">Cantidad de registros en cada área de gestión</p>

      <ul className="mt-6 space-y-4">
        {breakdown.map((item, i) => (
          <motion.li
            key={item.category}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-white/80">
                <item.icon className="size-3.5 shrink-0" style={{ color: item.color }} />
                <span className="truncate">{item.label}</span>
              </span>
              <span className="shrink-0 font-heading text-sm font-bold text-white">{item.count}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.count / max) * 100}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
