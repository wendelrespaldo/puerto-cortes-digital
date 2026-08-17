"use client";

import { MapPin } from "lucide-react";
import { categoryMeta, statusMeta, type MayorRecord } from "@/data/alcaldia";
import ProgressBar from "@/components/shared/ProgressBar";
import { cn } from "@/lib/utils";

export default function AlcaldeRecordCard({
  record,
  onClick,
}: {
  record: MayorRecord;
  onClick: () => void;
}) {
  const category = categoryMeta[record.category];
  const status = statusMeta[record.status];

  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className={cn("relative flex h-28 items-end bg-gradient-to-br p-4", category.gradient)}>
        <category.icon className="absolute -right-3 -top-3 size-16 text-white/10" />
        <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          <span className={cn("size-1.5 rounded-full", status.dot)} />
          {status.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold tracking-wide text-pc-green-700 uppercase">{category.label}</p>
        <h3 className="mt-1.5 font-heading text-base leading-snug font-bold text-foreground">{record.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {record.community}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{record.description}</p>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="font-semibold text-pc-green-700">{record.investment}</span>
        </div>

        {record.progress !== null && (
          <div className="mt-3">
            <ProgressBar value={record.progress} className="h-1.5" />
          </div>
        )}
      </div>
    </button>
  );
}
