"use client";

import { motion } from "framer-motion";
import { Milestone } from "lucide-react";
import { miniStories } from "@/data/puertoCortesInfo";

export default function MiniStories() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-pc-amber-500/15 text-pc-amber-600">
            <Milestone className="size-4.5" />
          </span>
          <h2 className="font-heading text-xl font-bold text-foreground">Curiosidades porteñas</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {miniStories.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border/70 bg-pc-sand-50 p-5 transition hover:-translate-y-1 hover:border-pc-green-300 hover:shadow-md"
            >
              <p className="font-heading text-sm font-bold text-pc-green-800">{s.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
