"use client";

import { motion } from "motion/react";
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

export function DoublyLinkedListRenderer({ state, highlights, pointers }: Props) {
  const lastIndex = state.items.length - 1;

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 py-8 px-4">
      {state.items.length > 0 && (
        <span className="rounded-md border border-dashed border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-muted)]">
          NULL
        </span>
      )}
      {state.items.length === 0 && <p className="text-sm text-[var(--color-muted)]">Lista vazia.</p>}
      {state.items.map((item, index) => {
        const color = colorForHighlight(highlights, item.id);
        const labels = pointerLabelsFor(pointers, item.id);
        return (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex items-center gap-1"
          >
            {index > 0 && (
              <span className="text-lg text-[var(--color-muted)]" aria-hidden>
                ⇄
              </span>
            )}
            <div className="flex flex-col items-center gap-1">
              {labels.length > 0 && (
                <div className="flex flex-col items-center text-xs font-semibold text-[var(--color-primary)]">
                  <span>{labels.join(" / ")}</span>
                  <span aria-hidden>▼</span>
                </div>
              )}
              <motion.div
                animate={{ backgroundColor: color ?? "var(--color-surface)" }}
                transition={{ duration: 0.25 }}
                className="flex h-14 min-w-14 items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-border)] px-3 font-mono text-lg font-semibold"
                style={{ color: color ? "#fff" : "var(--color-foreground)" }}
              >
                {item.value}
              </motion.div>
              <span className="text-xs text-[var(--color-muted)]">
                {index === 0 && index === lastIndex
                  ? "cabeça/cauda"
                  : index === 0
                    ? "cabeça"
                    : index === lastIndex
                      ? "cauda"
                      : ""}
              </span>
            </div>
          </motion.div>
        );
      })}
      {state.items.length > 0 && (
        <span className="rounded-md border border-dashed border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-muted)]">
          NULL
        </span>
      )}
    </div>
  );
}
