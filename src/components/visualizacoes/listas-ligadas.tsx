"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { LinkedListRenderer } from "@/components/visualizer/renderers/LinkedListRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { llInsertHead, llInsertTail, llRemoveHead, llSearch } from "@/lib/algorithms/linkedList";
import { LL_INSERT_HEAD_CODE, LL_INSERT_TAIL_CODE, LL_REMOVE_HEAD_CODE, LL_SEARCH_CODE } from "@/lib/code/linkedList.code";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "inserir-inicio",
    label: "Inserir no início",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => llInsertHead(state, Number(values.value)),
  },
  {
    id: "inserir-fim",
    label: "Inserir no final",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "42" }],
    run: (state, values) => llInsertTail(state, Number(values.value)),
  },
  {
    id: "remover-inicio",
    label: "Remover do início",
    run: (state) => llRemoveHead(state),
  },
  {
    id: "buscar",
    label: "Buscar valor",
    inputs: [{ id: "target", label: "Valor a buscar", type: "number", placeholder: "20" }],
    run: (state, values) => llSearch(state, Number(values.target)),
  },
];

export default function ListasLigadasPlayground() {
  const initialState = useMemo(() => makeArrayState([10, 20, 30]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={LinkedListRenderer}
      code={{
        "inserir-inicio": LL_INSERT_HEAD_CODE,
        "inserir-fim": LL_INSERT_TAIL_CODE,
        "remover-inicio": LL_REMOVE_HEAD_CODE,
        buscar: LL_SEARCH_CODE,
      }}
      legend={[
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
        { label: "atual (percorrendo)", color: "var(--color-highlight-visit)" },
        { label: "comparando", color: "var(--color-highlight-compare)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
        { label: "encontrado", color: "var(--color-highlight-success)" },
      ]}
    />
  );
}
