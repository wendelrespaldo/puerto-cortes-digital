"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Trophy,
  FileStack,
  TrendingUp,
  BarChart3,
  Users,
  ExternalLink,
} from "lucide-react";
import { municipalSystems } from "@/data/programs";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const icons = [Mail, Trophy, FileStack, TrendingUp, BarChart3, Users];
const gradients = [
  "from-pc-green-500 to-pc-green-700",
  "from-pc-blue-500 to-pc-blue-700",
  "from-pc-amber-500 to-pc-amber-600",
  "from-pc-coral-500 to-pc-coral-600",
  "from-pc-green-600 to-pc-navy-800",
  "from-pc-blue-600 to-pc-navy-800",
];

export default function MunicipalSystems() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Plataformas internas"
          title="Accesos municipales"
          subtitle="Sistemas de uso interno para el personal de la municipalidad."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {municipalSystems.map((system, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.button
                key={system.id}
                type="button"
                onClick={() => {
                  setActive(system.id);
                  setTimeout(() => setActive((cur) => (cur === system.id ? null : cur)), 2200);
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
              >
                <span
                  role="status"
                  className={cn(
                    "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-pc-navy-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all duration-200",
                    active === system.id ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  )}
                >
                  Acceso exclusivo del personal
                </span>
                <span
                  className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${gradients[i % gradients.length]}`}
                >
                  <Icon className="size-5.5" />
                </span>
                <span>
                  <span className="block text-xs font-bold text-foreground/90 sm:text-sm">
                    {system.title}
                  </span>
                  <span className="mt-0.5 hidden text-[11px] text-muted-foreground sm:block">
                    {system.description}
                  </span>
                </span>
                <ExternalLink className="size-3.5 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
