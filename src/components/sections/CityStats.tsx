"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { cityStats } from "@/data/puertoCortesInfo";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

export default function CityStats() {
  return (
    <section className="bg-pc-navy-950 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-amber-300 uppercase">
            <BarChart3 className="size-3.5" />
            Puerto Cortés en cifras
          </span>
          <h2 className="font-heading text-2xl font-bold text-white text-balance sm:text-3xl">
            La ciudad, en números
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cityStats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
            >
              <AnimatedCounter
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
                className="block font-heading text-2xl font-bold text-white sm:text-3xl"
              />
              <p className="mt-1.5 text-xs font-medium text-pc-green-100 sm:text-sm">
                {stat.label}
              </p>
              <p className="mt-1 text-[11px] text-white/40">{stat.hint}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
