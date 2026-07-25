"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { QueueRenderer } from "@/components/visualizer/renderers/QueueRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import {
  dequeInsertFront,
  dequeInsertBack,
  dequeRemoveFront,
  dequeRemoveBack,
} from "@/lib/algorithms/deque";
import {
  DEQUE_INSERT_FRONT_CODE,
  DEQUE_INSERT_BACK_CODE,
  DEQUE_REMOVE_FRONT_CODE,
  DEQUE_REMOVE_BACK_CODE,
} from "@/lib/code/deque.code";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "insere-frente",
    label: "Inserir na frente",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => dequeInsertFront(state, Number(values.value)),
  },
  {
    id: "insere-tras",
    label: "Inserir no final",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => dequeInsertBack(state, Number(values.value)),
  },
  {
    id: "remove-frente",
    label: "Remover da frente",
    run: (state) => dequeRemoveFront(state),
  },
  {
    id: "remove-tras",
    label: "Remover do final",
    run: (state) => dequeRemoveBack(state),
  },
];

export default function DequePlayground() {
  const initialState = useMemo(() => makeArrayState([10, 20, 30]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={QueueRenderer}
      code={{
        "insere-frente": DEQUE_INSERT_FRONT_CODE,
        "insere-tras": DEQUE_INSERT_BACK_CODE,
        "remove-frente": DEQUE_REMOVE_FRONT_CODE,
        "remove-tras": DEQUE_REMOVE_BACK_CODE,
      }}
      legend={[
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
      ]}
    />
  );
}
