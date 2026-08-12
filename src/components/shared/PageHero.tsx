import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden bg-pc-navy-950 pt-14 pb-16 sm:pt-20 sm:pb-20">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 size-80 animate-blob bg-pc-green-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-16 bottom-0 size-64 animate-blob bg-pc-blue-400/10 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/50">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white/80">{eyebrow}</span>
        </nav>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-white/70 text-balance sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
