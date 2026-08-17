"use client";

import { motion } from "framer-motion";
import { DoorOpen, Users2, HardHat, HeartHandshake, type LucideIcon } from "lucide-react";
import { openGovernment } from "@/data/alcaldia";
import SectionHeading from "@/components/shared/SectionHeading";

const icons: Record<string, LucideIcon> = {
  DoorOpen,
  Users2,
  HardHat,
  HeartHandshake,
};

export default function AlcaldePuertasAbiertas() {
  return (
    <section id="puertas-abiertas" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={openGovernment.eyebrow} title={openGovernment.title} subtitle={openGovernment.intro} />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {openGovernment.pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon];
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex gap-4 rounded-3xl border border-border bg-pc-sand-50 p-6"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pc-green-100 text-pc-green-700">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
