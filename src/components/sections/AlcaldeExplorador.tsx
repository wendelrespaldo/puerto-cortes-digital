"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  records,
  categoryMeta,
  statusMeta,
  typeMeta,
  communityOptions,
  type MayorRecord,
  type RecordCategory,
  type RecordStatus,
  type RecordType,
} from "@/data/alcaldia";
import SectionHeading from "@/components/shared/SectionHeading";
import AlcaldeRecordCard from "@/components/sections/AlcaldeRecordCard";
import AlcaldeDetailSheet from "@/components/sections/AlcaldeDetailSheet";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function ExploradorInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") as RecordCategory | null;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RecordCategory | "todas">(
    initialCategory && initialCategory in categoryMeta ? initialCategory : "todas"
  );
  const [status, setStatus] = useState<RecordStatus | "todos">("todos");
  const [type, setType] = useState<RecordType | "todos">("todos");
  const [community, setCommunity] = useState<string>("todas");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<MayorRecord | null>(null);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return records.filter((rec) => {
      if (category !== "todas" && rec.category !== category) return false;
      if (status !== "todos" && rec.status !== status) return false;
      if (type !== "todos" && rec.type !== type) return false;
      if (community !== "todas" && !rec.community.includes(community)) return false;
      if (q) {
        const haystack = normalize(`${rec.title} ${rec.description} ${rec.community}`);
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, status, type, community]);

  function updateQuery(value: string) {
    setQuery(value);
    setVisible(PAGE_SIZE);
  }
  function updateCategory(value: RecordCategory | "todas") {
    setCategory(value);
    setVisible(PAGE_SIZE);
  }
  function updateStatus(value: RecordStatus | "todos") {
    setStatus(value);
    setVisible(PAGE_SIZE);
  }
  function updateType(value: RecordType | "todos") {
    setType(value);
    setVisible(PAGE_SIZE);
  }
  function updateCommunity(value: string) {
    setCommunity(value);
    setVisible(PAGE_SIZE);
  }

  return (
    <section id="explorador" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explora la gestión"
          title="Buscador de proyectos y acciones"
          subtitle="Filtra por categoría, estado, tipo o comunidad, o busca por texto libre."
        />

        <div className="mt-8 space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              placeholder="Buscar por título, comunidad o descripción..."
              className="w-full rounded-full border border-border bg-muted/40 py-3 pr-4 pl-11 text-sm outline-none transition focus:border-pc-green-400 focus:bg-white focus:ring-3 focus:ring-pc-green-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              <SlidersHorizontal className="size-3.5" />
              Filtros
            </span>
            <FilterSelect
              value={category}
              onChange={(v) => updateCategory(v as RecordCategory | "todas")}
              options={[
                { value: "todas", label: "Todas las categorías" },
                ...Object.entries(categoryMeta).map(([id, meta]) => ({ value: id, label: meta.label })),
              ]}
            />
            <FilterSelect
              value={status}
              onChange={(v) => updateStatus(v as RecordStatus | "todos")}
              options={[
                { value: "todos", label: "Todos los estados" },
                ...Object.entries(statusMeta).map(([id, meta]) => ({ value: id, label: meta.label })),
              ]}
            />
            <FilterSelect
              value={type}
              onChange={(v) => updateType(v as RecordType | "todos")}
              options={[
                { value: "todos", label: "Todos los tipos" },
                ...Object.entries(typeMeta).map(([id, meta]) => ({ value: id, label: meta.label })),
              ]}
            />
            <FilterSelect
              value={community}
              onChange={updateCommunity}
              options={[
                { value: "todas", label: "Todas las comunidades" },
                ...communityOptions.map((c) => ({ value: c, label: c })),
              ]}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${status}-${type}-${community}-${query}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.slice(0, visible).map((rec) => (
              <AlcaldeRecordCard key={rec.id} record={rec} onClick={() => setSelected(rec)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted-foreground">No encontramos proyectos con esos filtros.</p>
          </div>
        )}

        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full bg-pc-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pc-green-800"
            >
              Mostrar más ({filtered.length - visible} restantes)
            </button>
          </div>
        )}
      </div>

      <AlcaldeDetailSheet record={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "rounded-full border border-border bg-white px-3.5 py-2 text-xs font-medium text-foreground/80 outline-none transition hover:bg-muted focus:border-pc-green-400 focus:ring-3 focus:ring-pc-green-100"
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default function AlcaldeExplorador() {
  return (
    <Suspense fallback={null}>
      <ExploradorInner />
    </Suspense>
  );
}
