"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import type { Highlight } from "@/lib/types";
import type { HashState } from "@/lib/algorithms/hashTable";
import { colorForHighlight } from "@/lib/highlightColor";

type Props = {
  state: HashState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

export function HashTableRenderer({ state, highlights, pointers }: Props) {
  const activeBucket = pointers?.bucket !== undefined ? Number(pointers.bucket) : null;

  return (
    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {state.buckets.map((bucket, index) => (
        <div
          key={index}
          className={clsx(
            "rounded-xl border p-3 transition-colors duration-300",
            activeBucket === index
              ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]"
              : "border-[var(--color-border)]"
          )}
        >
          <div className="mb-2 font-mono text-xs text-[var(--color-muted)]">bucket {index}</div>
          <div className="flex min-h-9 flex-wrap items-center gap-1">
            {bucket.length === 0 && (
              <span className="text-xs text-[var(--color-muted)]">vazio</span>
            )}
            {bucket.map((item, i) => {
              const color = colorForHighlight(highlights, item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex items-center gap-1"
                >
                  <motion.span
                    animate={{ backgroundColor: color ?? "var(--color-surface)" }}
                    transition={{ duration: 0.25 }}
                    className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-[var(--color-border)] font-mono text-sm font-semibold"
                    style={{ color: color ? "#1a1206" : "var(--color-foreground)" }}
                  >
                    {item.value}
                  </motion.span>
                  {i < bucket.length - 1 && (
                    <span className="text-[var(--color-muted)]" aria-hidden>
                      →
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
