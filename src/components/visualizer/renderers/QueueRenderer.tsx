"use client";

import { motion, AnimatePresence } from "motion/react";
import type { ArrayState, Highlight } from "@/lib/types";
import { colorForHighlight } from "@/lib/highlightColor";

type Props = {
  state: ArrayState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

function pointerLabelsFor(pointers: Record<string, string> | undefined, id: string) {
  if (!pointers) return [];
  return Object.entries(pointers)
    .filter(([, targetId]) => targetId === id)
    .map(([label]) => label);
}

export function QueueRenderer({ state, highlights, pointers }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 py-8">
      <div className="flex items-center gap-4 rounded-lg border-2 border-dashed border-[var(--color-border)] px-6 py-4">
        <span className="text-xs font-semibold text-[var(--color-muted)]">entrada ▶</span>
        <div className="flex items-end gap-3">
          <AnimatePresence initial={false}>
            {state.items.map((item) => {
              const color = colorForHighlight(highlights, item.id);
              const labels = pointerLabelsFor(pointers, item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.6, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.6, x: -20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex flex-col items-center gap-1"
                >
                  {labels.length > 0 && (
                    <div className="text-xs font-semibold text-[var(--color-primary)]">
                      {labels.join(" / ")}
                    </div>
                  )}
                  <motion.div
                    animate={{ backgroundColor: color ?? "var(--color-surface)" }}
                    transition={{ duration: 0.25 }}
                    className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-[var(--color-border)] font-mono text-lg font-semibold"
                    style={{ color: color ? "#fff" : "var(--color-foreground)" }}
                  >
                    {item.value}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {state.items.length === 0 && (
            <p className="px-6 text-sm text-[var(--color-muted)]">Fila vazia.</p>
          )}
        </div>
        <span className="text-xs font-semibold text-[var(--color-muted)]">◀ saída</span>
      </div>
    </div>
  );
}
