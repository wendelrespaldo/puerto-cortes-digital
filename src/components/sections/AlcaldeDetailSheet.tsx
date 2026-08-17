"use client";

import { MapPin, Wallet, Users, Camera, Video, FileStack, Layers } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { categoryMeta, statusMeta, typeMeta, type MayorRecord } from "@/data/alcaldia";
import ProgressBar from "@/components/shared/ProgressBar";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { cn } from "@/lib/utils";

export default function AlcaldeDetailSheet({
  record,
  onClose,
}: {
  record: MayorRecord | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!record} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-lg">
        {record && (
          <>
            <div
              className={cn(
                "flex h-40 shrink-0 items-end bg-gradient-to-br p-5",
                categoryMeta[record.category].gradient
              )}
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <span className={cn("size-1.5 rounded-full", statusMeta[record.status].dot)} />
                  {statusMeta[record.status].label}
                </span>
              </div>
            </div>

            <SheetHeader className="gap-2 p-5 pb-0">
              <p className="text-xs font-semibold tracking-wide text-pc-green-700 uppercase">
                {categoryMeta[record.category].label} · {record.subcategory}
              </p>
              <SheetTitle className="text-xl leading-snug">{record.title}</SheetTitle>
              <SheetDescription className="flex items-center gap-1.5">
                <MapPin className="size-3.5 shrink-0" />
                {record.community}
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 space-y-6 p-5">
              {record.possibleDuplicateOf && (
                <p className="rounded-xl border border-pc-amber-400/40 bg-pc-amber-50 px-3.5 py-2.5 text-xs text-pc-amber-800">
                  Este registro podría referirse al mismo proyecto que{" "}
                  <span className="font-semibold">{record.possibleDuplicateOf}</span>, mencionado en otra sección del
                  informe original. Se conservan ambos para no omitir información de la fuente.
                </p>
              )}

              <p className="text-sm leading-relaxed text-foreground/85">{record.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-muted/40 p-3.5">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    <Layers className="size-3.5" />
                    Tipo
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{typeMeta[record.type].label}</p>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3.5">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    <Wallet className="size-3.5" />
                    Inversión
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{record.investment}</p>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3.5">
                  <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Fecha</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{record.date}</p>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-3.5">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    <Users className="size-3.5" />
                    Beneficiarios
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{record.beneficiaries}</p>
                </div>
              </div>

              {record.progress !== null && (
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Avance</span>
                    <AnimatedCounter
                      value={record.progress}
                      suffix="%"
                      className="font-semibold text-foreground"
                    />
                  </div>
                  <ProgressBar value={record.progress} />
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 border-t border-border pt-5">
                <EmptyMedia icon={Camera} label="Fotografías" count={record.photos.length} />
                <EmptyMedia icon={Video} label="Videos" count={record.videos.length} />
                <EmptyMedia icon={FileStack} label="Documentos" count={record.documents.length} />
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyMedia({
  icon: Icon,
  label,
  count,
}: {
  icon: typeof Camera;
  label: string;
  count: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-border p-3.5 text-center">
      <Icon className="size-4.5 text-muted-foreground/60" />
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      <p className="text-[10px] text-muted-foreground/60">
        {count > 0 ? count : "Próximamente"}
      </p>
    </div>
  );
}
