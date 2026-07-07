"use client";

import { motion } from "motion/react";
import type { Highlight } from "@/lib/types";
import type { ObjetoState } from "@/lib/algorithms/objetoClasse";
import { colorForHighlight } from "@/lib/highlightColor";

type Props = {
  state: ObjetoState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

export function ObjetoRenderer({ state, highlights }: Props) {
  if (!state.modo) {
    return (
      <div className="flex items-center justify-center p-10 text-sm text-[var(--color-muted)]">
        Escolha uma operação e preencha base, altura e tipo (R = retângulo, T = triângulo, E =
        elipse).
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <div className="mb-2 text-xs text-[var(--color-muted)]">
          {state.modo === "livre" ? "Objeto livre (sem classe)" : "Objeto criado via classe FormaGeometrica"}
        </div>
        <div className="flex flex-wrap gap-3">
          {state.checks.map((c) => {
            const color = colorForHighlight(highlights, c.id);
            return (
              <motion.div
                key={c.id}
                animate={{ borderColor: color ?? "var(--color-border)" }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border-2 px-4 py-2 font-mono text-sm"
              >
                <span className="text-[var(--color-muted)]">{c.label}: </span>
                <span className="font-semibold">{c.detalhe}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {state.erro && (
        <div className="rounded-lg border border-[var(--color-highlight-danger)] bg-[color-mix(in_srgb,var(--color-highlight-danger)_12%,transparent)] px-4 py-3 text-sm text-[var(--color-highlight-danger)]">
          {state.erro}
        </div>
      )}

      {state.area !== null && (
        <div className="rounded-lg border border-[var(--color-highlight-success)] bg-[color-mix(in_srgb,var(--color-highlight-success)_12%,transparent)] px-4 py-3 text-sm">
          <span className="text-[var(--color-muted)]">área calculada: </span>
          <span className="font-mono font-semibold text-[var(--color-highlight-success)]">
            {state.area.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
