"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

type Tab = "licao" | "visualizacao" | "pratica";

const TAB_LABEL: Record<Tab, string> = {
  licao: "📖 Lição",
  visualizacao: "🎬 Visualização",
  pratica: "✏️ Prática",
};

export function TopicTabs({
  licao,
  visualizacao,
  pratica,
}: {
  licao: ReactNode;
  visualizacao: ReactNode;
  pratica: ReactNode;
}) {
  const [tab, setTab] = useState<Tab>("licao");
  const content: Record<Tab, ReactNode> = { licao, visualizacao, pratica };

  return (
    <div>
      <div
        role="tablist"
        className="mb-6 flex gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-1"
      >
        {(Object.keys(TAB_LABEL) as Tab[]).map((key) => (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={clsx(
              "relative flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              tab === key
                ? "text-[var(--color-foreground)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            )}
          >
            {tab === key && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-lg bg-[var(--color-surface)] shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{TAB_LABEL[key]}</span>
          </button>
        ))}
      </div>
      <div>{content[tab]}</div>
    </div>
  );
}
