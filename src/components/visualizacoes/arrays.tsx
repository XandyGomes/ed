"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { ArrayRenderer } from "@/components/visualizer/renderers/ArrayRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { arrayAccess, arrayInsertAt, arrayRemoveAt } from "@/lib/algorithms/array";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "acessar",
    label: "Acessar por índice",
    inputs: [{ id: "index", label: "Índice", type: "number", placeholder: "0" }],
    run: (state, values) => arrayAccess(state, Number(values.index)),
  },
  {
    id: "inserir",
    label: "Inserir na posição",
    inputs: [
      { id: "index", label: "Posição", type: "number", placeholder: "0" },
      { id: "value", label: "Valor", type: "number", placeholder: "42" },
    ],
    run: (state, values) => arrayInsertAt(state, Number(values.index), Number(values.value)),
  },
  {
    id: "remover",
    label: "Remover da posição",
    inputs: [{ id: "index", label: "Posição", type: "number", placeholder: "0" }],
    run: (state, values) => arrayRemoveAt(state, Number(values.index)),
  },
];

export default function ArraysPlayground() {
  const initialState = useMemo(() => makeArrayState([10, 20, 30, 40, 50]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={ArrayRenderer}
      legend={[
        { label: "comparando/acessando", color: "var(--color-highlight-visit)" },
        { label: "sucesso", color: "var(--color-highlight-success)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
      ]}
    />
  );
}
