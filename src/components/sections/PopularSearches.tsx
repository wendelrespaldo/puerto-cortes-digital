"use client";

import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { popularSearches } from "@/data/services";
import { useSearch } from "@/components/shared/SearchProvider";

export default function PopularSearches() {
  const { openSearch } = useSearch();

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
              <motion.button
                key={term}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => openSearch(term)}
                className="rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground/80 transition hover:-translate-y-0.5 hover:border-pc-green-300 hover:bg-pc-green-50 hover:text-pc-green-800"
              >
                {term}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
