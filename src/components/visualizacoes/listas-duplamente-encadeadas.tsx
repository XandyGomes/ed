"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { DoublyLinkedListRenderer } from "@/components/visualizer/renderers/DoublyLinkedListRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import {
  dllInsertHead,
  dllInsertTail,
  dllRemoveHead,
  dllRemoveTail,
  dllSearch,
} from "@/lib/algorithms/doublyLinkedList";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "inserir-inicio",
    label: "Inserir no início",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => dllInsertHead(state, Number(values.value)),
  },
  {
    id: "inserir-fim",
    label: "Inserir no final",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => dllInsertTail(state, Number(values.value)),
  },
  {
    id: "remover-inicio",
    label: "Remover do início",
    run: (state) => dllRemoveHead(state),
  },
  {
    id: "remover-fim",
    label: "Remover do final",
    run: (state) => dllRemoveTail(state),
  },
  {
    id: "buscar",
    label: "Buscar valor",
    inputs: [{ id: "target", label: "Valor a buscar", type: "number", placeholder: "20" }],
    run: (state, values) => dllSearch(state, Number(values.target)),
  },
];

export default function ListasDuplamenteEncadeadasPlayground() {
  const initialState = useMemo(() => makeArrayState([10, 20, 30]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={DoublyLinkedListRenderer}
      legend={[
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
        { label: "comparando", color: "var(--color-highlight-compare)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
        { label: "encontrado", color: "var(--color-highlight-success)" },
      ]}
    />
  );
}
