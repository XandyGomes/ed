"use client";

import { motion, AnimatePresence } from "motion/react";
import type { ArrayState, Highlight } from "@/lib/types";
import { colorForHighlight } from "@/lib/highlightColor";

type Props = {
  state: ArrayState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

export function StackRenderer({ state, highlights, pointers }: Props) {
  const reversed = [...state.items].reverse();
  const topId = state.items[state.items.length - 1]?.id;

  return (
    <div className="flex flex-col items-center gap-1 py-8">
      {pointers?.topo && (
        <div className="text-xs font-semibold text-[var(--color-primary)]">topo ▼</div>
      )}
      <div className="flex min-h-[4rem] flex-col-reverse items-center gap-1 rounded-lg border-2 border-dashed border-[var(--color-border)] p-2">
        <AnimatePresence initial={false}>
          {reversed.length === 0 && (
            <p key="vazio" className="px-8 py-2 text-sm text-[var(--color-muted)]">
              Pilha vazia.
            </p>
          )}
          {reversed.map((item) => {
            const color = colorForHighlight(highlights, item.id);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.6, y: -20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  backgroundColor: color ?? "var(--color-surface)",
                }}
                exit={{ opacity: 0, scale: 0.6, y: -20 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex h-12 w-24 items-center justify-center rounded-lg border-2 border-[var(--color-border)] font-mono text-lg font-semibold"
                style={{ color: color ? "#fff" : "var(--color-foreground)" }}
              >
                {item.value}
                {item.id === topId && (
                  <span className="sr-only">(topo)</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="mt-1 text-xs text-[var(--color-muted)]">base</div>
    </div>
  );
}
