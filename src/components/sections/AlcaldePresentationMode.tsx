"use client";

import { useState } from "react";
import { Presentation } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AlcaldePresentationDeck from "@/components/sections/AlcaldePresentationDeck";

export default function AlcaldePresentationMode() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-pc-navy-900"
      >
        <Presentation className="size-4.5" />
        Modo presentación
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="top-0 left-0 h-screen max-h-screen w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-pc-navy-950 p-0 ring-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">Modo presentación — Gestión del Alcalde</DialogTitle>
          {open && <AlcaldePresentationDeck onClose={() => setOpen(false)} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
