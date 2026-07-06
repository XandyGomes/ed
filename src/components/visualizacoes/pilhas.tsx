"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { StackRenderer } from "@/components/visualizer/renderers/StackRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { stackPush, stackPop, stackPeek } from "@/lib/algorithms/stack";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "push",
    label: "push (empilhar)",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => stackPush(state, Number(values.value)),
  },
  {
    id: "pop",
    label: "pop (desempilhar)",
    run: (state) => stackPop(state),
  },
  {
    id: "peek",
    label: "peek (consultar topo)",
    run: (state) => stackPeek(state),
  },
];

export default function PilhasPlayground() {
  const initialState = useMemo(() => makeArrayState([10, 20, 30]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={StackRenderer}
      legend={[
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
        { label: "consultado", color: "var(--color-highlight-visit)" },
      ]}
    />
  );
}
