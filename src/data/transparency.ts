import type { LucideIcon } from "lucide-react";
import { Wallet, HardHat, FileSignature, BarChart3, FileStack } from "lucide-react";

export type TransparencyItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  value: string;
  hint: string;
};

export const transparencyItems: TransparencyItem[] = [
  {
    id: "presupuesto",
    icon: Wallet,
    title: "Presupuesto",
    value: "L 412.8M",
    hint: "Presupuesto vigente 2026",
  },
  {
    id: "obras",
    icon: HardHat,
    title: "Obras",
    value: "38 activas",
    hint: "Proyectos en ejecución",
  },
  {
    id: "contrataciones",
    icon: FileSignature,
    title: "Contrataciones",
    value: "126 procesos",
    hint: "Publicados este año",
  },
  {
    id: "ejecucion",
    icon: BarChart3,
    title: "Ejecución",
    value: "71%",
    hint: "Del presupuesto anual",
  },
  {
    id: "documentos",
    icon: FileStack,
    title: "Documentos",
    value: "540+",
    hint: "Disponibles para consulta",
  },
];

export const executionByQuarter = [
  { label: "T1", value: 62 },
  { label: "T2", value: 68 },
  { label: "T3", value: 71 },
  { label: "T4", value: 45 },
];
