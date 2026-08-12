"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "@/data/nav";

export default function MegaMenu({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const menu = item.megaMenu;
  if (!menu) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute inset-x-0 top-full z-40 pt-3"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl shadow-pc-green-950/10 ring-1 ring-black/5">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.85fr)]">
            {menu.groups.map((group) => (
              <div key={group.title} className="border-b border-border/70 p-6 lg:border-r lg:border-b-0 last:border-r-0">
                <p className="mb-3 text-xs font-semibold tracking-wide text-pc-green-700 uppercase">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-pc-green-50"
                        >
                          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-pc-green-100 text-pc-green-700 transition-colors group-hover:bg-pc-green-600 group-hover:text-white">
                            <Icon className="size-4.5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-foreground/90">
                              {link.label}
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {link.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-pc-green-700 via-pc-green-800 to-pc-navy-900 p-6 text-white">
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-40 animate-blob bg-white/10"
                aria-hidden
              />
              <div>
                <p className="text-xs font-semibold tracking-wide text-pc-green-200 uppercase">
                  {menu.tagline}
                </p>
                {menu.featured && (
                  <>
                    <p className="mt-3 font-heading text-lg font-bold">
                      {menu.featured.title}
                    </p>
                    <p className="mt-1.5 text-sm text-pc-green-100/90">
                      {menu.featured.description}
                    </p>
                  </>
                )}
              </div>
              {menu.featured && (
                <Link
                  href={menu.featured.href}
                  onClick={onNavigate}
                  className="group relative mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-pc-green-800 transition hover:bg-pc-amber-400 hover:text-pc-navy-900"
                >
                  {menu.featured.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
