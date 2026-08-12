"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { historyArticle } from "@/data/puertoCortesInfo";

export default function HistoryArticle() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative h-72 overflow-hidden rounded-3xl sm:h-[26rem]"
          >
            <Image
              src="/images/municipalidad/palacio-municipal-1.jpg"
              alt="Puerto Cortés, ciudad e historia"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pc-navy-950/50 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-pc-green-100 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-green-700 uppercase">
              <BookOpen className="size-3.5" />
              {historyArticle.eyebrow}
            </span>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
              {historyArticle.title}
            </h2>
            <div className="mt-5 space-y-4">
              {historyArticle.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
