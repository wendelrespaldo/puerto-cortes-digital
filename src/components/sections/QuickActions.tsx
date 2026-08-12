"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const colorMap = {
  green: {
    bg: "bg-pc-green-100",
    text: "text-pc-green-700",
    hoverBg: "group-hover:bg-pc-green-600",
    ring: "hover:ring-pc-green-300",
  },
  blue: {
    bg: "bg-pc-blue-100",
    text: "text-pc-blue-700",
    hoverBg: "group-hover:bg-pc-blue-600",
    ring: "hover:ring-pc-blue-300",
  },
  coral: {
    bg: "bg-pc-coral-500/10",
    text: "text-pc-coral-600",
    hoverBg: "group-hover:bg-pc-coral-500",
    ring: "hover:ring-pc-coral-300",
  },
  amber: {
    bg: "bg-pc-amber-500/15",
    text: "text-pc-amber-600",
    hoverBg: "group-hover:bg-pc-amber-500",
    ring: "hover:ring-pc-amber-300",
  },
} as const;

export default function QuickActions() {
  return (
    <section className="bg-pc-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Acciones rápidas"
          title="¿Qué necesitas hacer?"
          subtitle="Los servicios y trámites que más utiliza la ciudadanía, a un clic de distancia."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const colors = colorMap[service.color];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              >
                <Link
                  href={service.href}
                  className={cn(
                    "group relative flex h-full flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl",
                    colors.ring
                  )}
                >
                  <div
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl transition-colors duration-300",
                      colors.bg,
                      colors.hoverBg
                    )}
                  >
                    <service.icon
                      className={cn(
                        "size-6 transition-colors duration-300 group-hover:text-white",
                        colors.text
                      )}
                    />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                    <p className="border-t border-border/70 pt-3 text-xs text-muted-foreground">
                      {service.detail}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "mt-auto flex items-center gap-1 pt-4 text-sm font-semibold",
                      colors.text
                    )}
                  >
                    Ir ahora
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
