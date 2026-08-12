"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { tourismCategories } from "@/data/tourism";
import { cn } from "@/lib/utils";

export default function TourismMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute inset-x-0 top-full z-40 pt-3"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl shadow-pc-blue-950/10 ring-1 ring-black/5">
          <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-pc-blue-900 via-pc-green-900 to-pc-navy-950 px-6 py-4">
            <div className="flex items-center gap-2.5 text-white">
              <Compass className="size-4.5 text-pc-amber-400" />
              <div>
                <p className="font-heading text-sm font-bold">Descubre Puerto Cortés</p>
                <p className="text-xs text-white/60">Mar, historia y sabor caribeño.</p>
              </div>
            </div>
            <Link
              href="/turismo"
              onClick={onNavigate}
              className="group flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-pc-navy-900 transition hover:bg-pc-amber-400"
            >
              Descubrir Puerto Cortés
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-2.5 p-3">
            {tourismCategories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/turismo#${cat.id}`}
                onClick={onNavigate}
                className={cn(
                  "group relative flex h-28 flex-col justify-end overflow-hidden rounded-2xl",
                  i === 4 && "col-span-2"
                )}
              >
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                      cat.gradient
                    )}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-colors group-hover:from-black/85" />
                <cat.icon className="absolute right-2.5 top-2.5 size-3.5 text-white/70" />
                <span className="relative z-10 p-2.5 font-heading text-xs font-bold text-white">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
