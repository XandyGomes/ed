"use client";

import { useState, type ReactNode } from "react";
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
        className="mb-6 flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-1"
      >
        {(Object.keys(TAB_LABEL) as Tab[]).map((key) => (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={clsx(
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              tab === key
                ? "bg-[var(--color-surface)] shadow-sm"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            )}
          >
            {TAB_LABEL[key]}
          </button>
        ))}
      </div>
      <div>{content[tab]}</div>
    </div>
  );
}
