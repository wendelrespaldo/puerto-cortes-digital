"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/data/programs";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Programs() {
  return (
    <section className="bg-pc-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Comunidad"
          title="Programas y servicios municipales"
          subtitle="Iniciativas que acompañan a las familias de Puerto Cortés en cada etapa."
        />
      </div>

      <div className="mt-10 overflow-x-auto pb-4 scrollbar-none">
        <div className="flex w-max gap-5 px-4 sm:px-6 lg:px-8">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={program.href}
              className="group relative h-72 w-64 shrink-0 overflow-hidden rounded-3xl shadow-md transition hover:shadow-2xl sm:w-72"
            >
              <Image
                src={program.image}
                alt={program.title}
                fill
                sizes="288px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 transition-colors group-hover:from-pc-green-950/90" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-heading text-lg font-bold text-white">{program.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs text-white/75">
                  {program.description}
                </p>
                <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-pc-green-300 opacity-0 transition-opacity group-hover:opacity-100">
                  Conocer más
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
