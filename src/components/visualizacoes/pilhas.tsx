"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { StackRenderer } from "@/components/visualizer/renderers/StackRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { stackPush, stackPop, stackPeek } from "@/lib/algorithms/stack";
import { STACK_PUSH_CODE, STACK_POP_CODE, STACK_PEEK_CODE } from "@/lib/code/stack.code";
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
      code={{ push: STACK_PUSH_CODE, pop: STACK_POP_CODE, peek: STACK_PEEK_CODE }}
      legend={[
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
        { label: "consultado", color: "var(--color-highlight-visit)" },
      ]}
    />
  );
}
