"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { popularSearches } from "@/data/search";

export default function PopularSearches() {
  return (
    <section className="border-y border-border/70 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex shrink-0 items-center gap-2.5 text-foreground">
            <span className="flex size-9 items-center justify-center rounded-full bg-pc-green-100 text-pc-green-700">
              <TrendingUp className="size-4.5" />
            </span>
            <span className="font-heading text-base font-bold">Lo más buscado</span>
          </div>

          <div className="flex flex-1 flex-wrap gap-2.5">
            {popularSearches.map((term, i) => (
              <motion.div
                key={term.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  href={term.href}
                  className="inline-block rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground/80 transition hover:-translate-y-0.5 hover:border-pc-green-300 hover:bg-pc-green-50 hover:text-pc-green-800"
                >
                  {term.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
