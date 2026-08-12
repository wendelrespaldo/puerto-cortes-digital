"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Send,
  Wallet,
  Bell,
  ArrowRight,
  CheckCircle2,
  Clock,
  UserRound,
} from "lucide-react";
import ComingSoonButton from "@/components/shared/ComingSoonButton";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "tramites",
    label: "Mis trámites",
    icon: FileText,
    rows: [
      { title: "Solvencia municipal", status: "Listo para retirar", done: true },
      { title: "Permiso de construcción", status: "En revisión", done: false },
    ],
  },
  {
    id: "solicitudes",
    label: "Mis solicitudes",
    icon: Send,
    rows: [
      { title: "Poda de árbol — Barrio Cabo Rojo", status: "Programada", done: false },
      { title: "Bacheo — 4ta calle", status: "Atendida", done: true },
    ],
  },
  {
    id: "pagos",
    label: "Mis pagos",
    icon: Wallet,
    rows: [
      { title: "Bienes inmuebles 2026", status: "Pagado", done: true },
      { title: "Tasa de aseo — agosto", status: "Pendiente", done: false },
    ],
  },
  {
    id: "notificaciones",
    label: "Mis notificaciones",
    icon: Bell,
    rows: [
      { title: "Tu solvencia está lista", status: "Hace 2 días", done: true },
      { title: "Nueva obra en tu sector", status: "Hace 5 días", done: true },
    ],
  },
];

export default function CitizenDashboard() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28" id="portal">
      <div
        aria-hidden
        className="absolute -left-40 top-0 size-[28rem] rounded-full bg-pc-green-50 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Portal Ciudadano"
              title="Tu municipio, más cerca"
              subtitle="Un panel personal para dar seguimiento a cada gestión que haces con la municipalidad — sin filas, sin llamadas, sin papeleo perdido."
            />
            <ul className="mt-7 space-y-3.5">
              {[
                "Sigue el estado de tus trámites en tiempo real.",
                "Recibe notificaciones cuando algo avanza.",
                "Consulta tu historial de pagos municipales.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-pc-green-600" />
                  {item}
                </li>
              ))}
            </ul>
            <ComingSoonButton
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-pc-green-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pc-green-900/20 transition hover:bg-pc-green-800"
              message="El acceso ciudadano se conectará en la próxima fase"
            >
              <UserRound className="size-4.5" />
              Entrar al Portal Ciudadano
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ComingSoonButton>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-2xl shadow-pc-green-950/10">
              <div className="flex items-center gap-3 bg-gradient-to-r from-pc-green-700 to-pc-green-800 px-6 py-5 text-white">
                <span className="flex size-10 items-center justify-center rounded-full bg-white/15 font-heading text-sm font-bold">
                  MC
                </span>
                <div>
                  <p className="text-sm font-semibold">Mi Puerto Cortés</p>
                  <p className="text-xs text-pc-green-100/80">Bienvenida, María Cortés</p>
                </div>
                <span className="ml-auto flex size-8 items-center justify-center rounded-full bg-white/15">
                  <Bell className="size-4" />
                </span>
              </div>

              <div className="flex gap-1 overflow-x-auto border-b border-border px-3 pt-3 scrollbar-none">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 rounded-t-xl px-3.5 py-2.5 text-xs font-semibold transition-colors",
                      active === tab.id
                        ? "border-b-2 border-pc-green-600 text-pc-green-700"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <tab.icon className="size-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3 p-5">
                {current.rows.map((row) => (
                  <div
                    key={row.title}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/30 p-3.5"
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full",
                        row.done ? "bg-pc-green-100 text-pc-green-700" : "bg-pc-amber-500/15 text-pc-amber-600"
                      )}
                    >
                      {row.done ? <CheckCircle2 className="size-4.5" /> : <Clock className="size-4.5" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground/90">{row.title}</p>
                      <p className="text-xs text-muted-foreground">{row.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl bg-pc-amber-400 px-4 py-3 text-xs font-bold text-pc-navy-900 shadow-xl sm:block">
              +3 notificaciones nuevas
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
