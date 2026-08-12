"use client";

import Link from "next/link";
import { useState } from "react";
import { newsTicker } from "@/data/news";

export default function NewsTicker() {
  const [paused, setPaused] = useState(false);
  const items = [...newsTicker, ...newsTicker];

  return (
    <div className="relative flex items-center gap-4 overflow-hidden border-y border-pc-green-800/40 bg-pc-navy-950 py-3">
      <span className="z-10 ml-4 flex shrink-0 items-center gap-2 rounded-full bg-pc-coral-600 px-3 py-1 text-xs font-bold tracking-wide text-white shadow-lg shadow-pc-coral-900/30 sm:ml-6">
        <span className="size-1.5 animate-pulse rounded-full bg-white" />
        AHORA
      </span>

      <div
        className="mask-fade-x flex-1 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex w-max animate-marquee gap-10 whitespace-nowrap"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {items.map((item, i) => (
            <Link
              key={`${item.id}-${i}`}
              href="/noticias"
              className="flex items-center gap-2 text-sm font-medium text-pc-sand-100/85 transition hover:text-pc-amber-400"
            >
              <span className="size-1 rounded-full bg-pc-green-500" />
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
