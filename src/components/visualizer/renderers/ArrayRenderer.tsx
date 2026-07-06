"use client";

import { motion, AnimatePresence } from "motion/react";
import type { ArrayState, Highlight } from "@/lib/types";
import { colorForHighlight } from "@/lib/highlightColor";

type Props = {
  state: ArrayState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
  showIndex?: boolean;
};

function pointerLabelsFor(pointers: Record<string, string> | undefined, id: string) {
  if (!pointers) return [];
  return Object.entries(pointers)
    .filter(([, targetId]) => targetId === id)
    .map(([label]) => label);
}

export function ArrayRenderer({ state, highlights, pointers, showIndex = true }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-3 py-8 px-4">
      <AnimatePresence initial={false}>
        {state.items.map((item, index) => {
          const color = colorForHighlight(highlights, item.id);
          const labels = pointerLabelsFor(pointers, item.id);
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.6, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex flex-col items-center gap-1"
            >
              {labels.length > 0 && (
                <div className="flex flex-col items-center text-xs font-semibold text-[var(--color-primary)]">
                  <span>{labels.join(" / ")}</span>
                  <span aria-hidden>▼</span>
                </div>
              )}
              <motion.div
                animate={{
                  backgroundColor: color ?? "var(--color-surface)",
                  scale: color ? 1.08 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-[var(--color-border)] font-mono text-lg font-semibold shadow-sm"
                style={{ color: color ? "#fff" : "var(--color-foreground)" }}
              >
                {item.value}
              </motion.div>
              {showIndex && (
                <span className="text-xs text-[var(--color-muted)]">{index}</span>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      {state.items.length === 0 && (
        <p className="text-sm text-[var(--color-muted)]">Array vazio.</p>
      )}
    </div>
  );
}
