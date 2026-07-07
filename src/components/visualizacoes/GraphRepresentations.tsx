"use client";

import { useMemo } from "react";
import type { GraphState } from "@/lib/algorithms/graph";
import { neighborsOf } from "@/lib/algorithms/graph";

type Props = {
  state: GraphState;
};

export function GraphRepresentations({ state }: Props) {
  const ids = useMemo(() => state.nodes.map((n) => n.id).sort(), [state.nodes]);

  const matrix = useMemo(() => {
    const map = new Map(ids.map((id) => [id, neighborsOf(state, id)]));
    return ids.map((row) => ids.map((col) => map.get(row)?.find((n) => n.id === col)?.weight ?? 0));
  }, [ids, state]);

  return (
    <div className="glass-panel rounded-2xl p-4">
      <h3 className="mb-1 text-sm font-semibold">Representação em memória</h3>
      <p className="mb-4 text-xs text-[var(--color-muted)]">
        O mesmo grafo do sandbox acima, representado das duas formas mais comuns no código.
      </p>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div>
          <div className="mb-2 text-xs text-[var(--color-muted)]">
            Matriz de adjacência ({ids.length}×{ids.length})
          </div>
          <div className="overflow-x-auto">
            <table className="border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-8" />
                  {ids.map((id) => (
                    <th key={id} className="px-2 py-1 font-mono text-xs text-[var(--color-muted)]">
                      {id}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ids.map((row, i) => (
                  <tr key={row}>
                    <th className="px-2 py-1 text-left font-mono text-xs text-[var(--color-muted)]">{row}</th>
                    {ids.map((col, j) => {
                      const val = matrix[i][j];
                      return (
                        <td
                          key={col}
                          className={`h-8 w-8 border border-[var(--color-border)] text-center font-mono text-xs ${
                            val ? "bg-[color-mix(in_srgb,var(--color-highlight-success)_16%,transparent)] font-semibold text-[var(--color-highlight-success)]" : "text-[var(--color-muted)]"
                          }`}
                        >
                          {val || 0}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            {ids.length * ids.length} posições guardadas, mesmo que a maioria seja zero.
          </p>
        </div>

        <div>
          <div className="mb-2 text-xs text-[var(--color-muted)]">Lista de adjacência</div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3 font-mono text-xs leading-relaxed">
            {ids.map((id) => {
              const vizinhos = neighborsOf(state, id);
              return (
                <div key={id}>
                  <span className="text-[var(--color-foreground)]">{id}</span>
                  <span className="text-[var(--color-muted)]"> → [</span>
                  {vizinhos.map((v, i) => (
                    <span key={v.id}>
                      {i > 0 && <span className="text-[var(--color-muted)]">, </span>}
                      {v.id}
                      <span className="text-[var(--color-muted)]">({v.weight})</span>
                    </span>
                  ))}
                  <span className="text-[var(--color-muted)]">]</span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            Só guarda as conexões que realmente existem, ideal para grafos esparsos.
          </p>
        </div>
      </div>
    </div>
  );
}
