"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import type { ArrayState, Highlight, OperationDef } from "@/lib/types";
import { useVisualizer } from "./useVisualizer";
import { VisualizerControls } from "./VisualizerControls";

type RendererProps = {
  state: ArrayState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

type Props = {
  initialState: ArrayState;
  operations: OperationDef<ArrayState>[];
  Renderer: ComponentType<RendererProps>;
  legend?: { label: string; color: string }[];
};

export function StructurePlayground({ initialState, operations, Renderer, legend }: Props) {
  const [structureState, setStructureState] = useState(initialState);
  const [selectedOpId, setSelectedOpId] = useState(operations[0]?.id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [frames, setFrames] = useState<Parameters<typeof useVisualizer<ArrayState>>[0]>([
    { id: 0, state: initialState, narration: "Escolha uma operação e clique em Executar." },
  ]);

  const visualizer = useVisualizer(frames);
  const selectedOp = operations.find((op) => op.id === selectedOpId) ?? operations[0];

  const handleExecute = () => {
    if (!selectedOp) return;
    const result = selectedOp.run(structureState, values);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setFrames(result.frames);
    setStructureState(result.nextState);
  };

  const handleReiniciar = () => {
    setStructureState(initialState);
    setFrames([{ id: 0, state: initialState, narration: "Estrutura reiniciada." }]);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[var(--color-muted)]">Operação</label>
          <select
            value={selectedOp?.id}
            onChange={(e) => {
              setSelectedOpId(e.target.value);
              setError(null);
            }}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm"
          >
            {operations.map((op) => (
              <option key={op.id} value={op.id}>
                {op.label}
              </option>
            ))}
          </select>
        </div>

        {selectedOp?.inputs?.map((input) => (
          <div key={input.id} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[var(--color-muted)]">{input.label}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              value={values[input.id] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [input.id]: e.target.value }))}
              className="w-28 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleExecute}
          className="rounded-md bg-[var(--color-primary)] px-4 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
        >
          Executar
        </button>
        <button
          type="button"
          onClick={handleReiniciar}
          className="rounded-md border border-[var(--color-border)] px-4 py-1.5 text-sm hover:bg-[var(--color-surface-muted)]"
        >
          Reiniciar estrutura
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="animate-[shake_0.4s] rounded-md border border-[var(--color-highlight-danger)] bg-[var(--color-highlight-danger)]/10 px-4 py-2 text-sm text-[var(--color-highlight-danger)]"
        >
          {error}
        </div>
      )}

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <Renderer
          state={visualizer.currentFrame?.state ?? structureState}
          highlights={visualizer.currentFrame?.highlights}
          pointers={visualizer.currentFrame?.pointers}
        />
      </div>

      {legend && (
        <div className="flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              {l.label}
            </span>
          ))}
        </div>
      )}

      <VisualizerControls visualizer={visualizer} />
    </div>
  );
}
