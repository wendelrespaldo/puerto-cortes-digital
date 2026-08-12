"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Megaphone, Lightbulb, MessageSquareHeart, ArrowRight, Users } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const actions = [
  {
    icon: Megaphone,
    title: "Reportar una situación",
    description: "Alumbrado, baches, desechos u otra situación en tu sector.",
    href: "/tramites#denuncias",
    color: "from-pc-coral-500 to-pc-coral-600",
  },
  {
    icon: Lightbulb,
    title: "Hacer una solicitud",
    description: "Pide una gestión o mejora concreta a la municipalidad.",
    href: "/servicios#solicitud",
    color: "from-pc-amber-500 to-pc-amber-600",
  },
  {
    icon: MessageSquareHeart,
    title: "Enviar comentario",
    description: "Comparte una idea u opinión sobre tu ciudad.",
    href: "/tramites#te-escucha",
    color: "from-pc-blue-500 to-pc-blue-600",
  },
];

export default function VoiceSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28" id="te-escucha">
      <div
        aria-hidden
        className="absolute -right-32 top-1/2 size-[26rem] -translate-y-1/2 animate-blob bg-pc-amber-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-24 bottom-0 size-72 animate-blob bg-pc-coral-500/10 blur-3xl"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Puerto Cortés te escucha"
          title="Tu voz importa"
          subtitle="Reporta, solicita o comparte una situación con la municipalidad — nosotros te damos seguimiento."
          align="center"
        />

        <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-pc-green-100 bg-pc-sand-50/60 p-4 sm:p-6">
          <span className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-pc-green-700 uppercase shadow-sm">
            <Users className="size-3.5" />
            Centro de participación ciudadana
          </span>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {actions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <Link
                href={action.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg`}
                >
                  <action.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-heading text-base font-bold text-foreground">
                  {action.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{action.description}</p>
                <span className="mt-5 flex items-center gap-1 text-sm font-semibold text-pc-green-700">
                  Empezar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
