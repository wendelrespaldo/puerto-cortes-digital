"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import {
  answerQuery,
  WELCOME_MESSAGE,
  SUGGESTED_QUESTIONS,
  type ChatAnswer,
} from "@/data/chatbot";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
  link?: ChatAnswer["link"];
};

let messageId = 0;
function nextId() {
  messageId += 1;
  return `m${messageId}`;
}

export default function MunicipalChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: "bot", text: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    const delay = Math.min(500 + trimmed.length * 12, 1800);
    setTimeout(() => {
      const result = answerQuery(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "bot", text: result.text, link: result.link },
      ]);
      setTyping(false);
    }, delay);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar asistente municipal" : "Abrir asistente municipal"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="fixed right-4 bottom-24 z-40 flex size-14 items-center justify-center rounded-full bg-pc-green-700 text-white shadow-xl shadow-pc-green-950/30 transition hover:bg-pc-green-800 lg:right-6 lg:bottom-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-pc-amber-400">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-pc-amber-400 opacity-75" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-4 bottom-[9.5rem] z-40 flex h-[min(34rem,70vh)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[23rem] lg:bottom-24"
          >
            <div className="flex shrink-0 items-center gap-3 bg-pc-navy-950 px-5 py-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Image
                  src="/images/logo/escudo-pc.png"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">Asistente Municipal</p>
                <p className="flex items-center gap-1 text-[11px] text-pc-green-200">
                  <span className="size-1.5 rounded-full bg-pc-green-400" />
                  Chat de prueba · Puerto Cortés Digital
                </p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-pc-sand-50 px-4 py-4">
              {messages.map((m) => (
                <ChatBubble key={m.id} message={m} />
              ))}
              {typing && <TypingBubble />}

              {!typing && messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-pc-green-200 bg-white px-3 py-1.5 text-xs font-medium text-pc-green-800 transition hover:border-pc-green-400 hover:bg-pc-green-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex shrink-0 items-center gap-2 border-t border-border bg-white p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                aria-label="Escribe tu pregunta para el asistente municipal"
                className="flex-1 rounded-full border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none transition focus:border-pc-green-400 focus:bg-white focus:ring-3 focus:ring-pc-green-100"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Enviar"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pc-green-700 text-white transition hover:bg-pc-green-800 disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-pc-green-700 text-white"
            : "rounded-bl-md bg-white text-foreground/90 ring-1 ring-border"
        )}
      >
        <p>{message.text}</p>
        {message.link && (
          <Link
            href={message.link.href}
            className={cn(
              "mt-2 inline-flex items-center gap-1 text-xs font-semibold",
              isUser ? "text-white underline" : "text-pc-green-700 hover:text-pc-green-800"
            )}
          >
            {message.link.label}
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 ring-1 ring-border">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-pc-green-600/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
