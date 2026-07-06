"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { QueueRenderer } from "@/components/visualizer/renderers/QueueRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { queueEnqueue, queueDequeue } from "@/lib/algorithms/queue";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "enqueue",
    label: "enqueue (entrar na fila)",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => queueEnqueue(state, Number(values.value)),
  },
  {
    id: "dequeue",
    label: "dequeue (sair da fila)",
    run: (state) => queueDequeue(state),
  },
];

export default function FilasPlayground() {
  const initialState = useMemo(() => makeArrayState([10, 20, 30]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={QueueRenderer}
      legend={[
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
      ]}
    />
  );
}
