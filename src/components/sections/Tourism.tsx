"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { tourismItems } from "@/data/programs";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Tourism() {
  const [main, ...rest] = tourismItems;

  return (
    <section className="bg-pc-navy-950 py-20 sm:py-28" id="turismo-preview">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Cultura y Turismo"
            title="Descubre Puerto Cortés"
            subtitle="El primer puerto de Honduras: mar, historia y sabor caribeño."
            tone="dark"
          />
          <Link
            href="/turismo"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:flex"
          >
            Explorar Puerto Cortés
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Link
              href="/turismo"
              className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl"
            >
              <Image
                src={main.image}
                alt={main.title}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-8">
                <span className="rounded-full bg-pc-amber-400 px-3 py-1 text-xs font-bold text-pc-navy-900">
                  Destacado
                </span>
                <h3 className="mt-4 font-heading text-3xl font-bold text-white">{main.title}</h3>
                <p className="mt-2 max-w-md text-sm text-white/75">{main.description}</p>
              </div>
            </Link>
          </motion.div>

          {rest.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Link
                href="/turismo"
                className="group relative flex h-44 flex-col justify-end overflow-hidden rounded-3xl lg:h-full"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="relative z-10 p-4">
                  <h4 className="font-heading text-base font-bold text-white">{item.title}</h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/turismo"
          className="mx-auto mt-8 flex w-fit items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white sm:hidden"
        >
          Explorar Puerto Cortés
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
