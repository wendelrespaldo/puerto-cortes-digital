"use client";

import { motion } from "framer-motion";
import { Sailboat, PartyPopper, CalendarHeart, Sparkle } from "lucide-react";
import { traditions } from "@/data/puertoCortesInfo";

const icons = [Sailboat, PartyPopper, CalendarHeart];
const gradients = [
  "from-pc-blue-600 to-pc-navy-900",
  "from-pc-amber-500 to-pc-coral-600",
  "from-pc-green-600 to-pc-navy-900",
];

const monthsStrip = [
  { month: "Marzo", label: "Aniversario de fundación" },
  { month: "Agosto", label: "Feria Agostina · Noche Veneciana" },
  { month: "Todo el año", label: "Actividades culturales y comunitarias" },
];

export default function LiveTraditions() {
  return (
    <section className="relative overflow-hidden bg-pc-sand-50 py-16 sm:py-20" id="eventos-vive">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-pc-green-100 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-green-700 uppercase">
            <Sparkle className="size-3.5" />
            Vive Puerto Cortés
          </span>
          <h2 className="font-heading text-2xl font-bold text-foreground text-balance sm:text-3xl">
            Tradiciones que se celebran cada año
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {traditions.map((t, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex flex-col rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} text-white shadow-md`}
                >
                  <Icon className="size-6" />
                </div>
                <span className="mt-4 text-xs font-bold tracking-wide text-pc-amber-600 uppercase">
                  {t.month}
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Línea de tiempo del año */}
        <div className="mt-12 rounded-3xl border border-border bg-white p-6 sm:p-8">
          <p className="mb-6 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Momentos del año
          </p>
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div
              aria-hidden
              className="absolute left-2 top-2 hidden h-px w-[calc(100%-1rem)] bg-border sm:block"
            />
            {monthsStrip.map((m) => (
              <div key={m.month} className="relative flex items-start gap-3 sm:flex-1 sm:flex-col sm:gap-3">
                <span className="relative z-10 mt-1 size-4 shrink-0 rounded-full border-2 border-pc-green-600 bg-white" />
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">{m.month}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
