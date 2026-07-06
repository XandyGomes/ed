"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { ArrayRenderer } from "@/components/visualizer/renderers/ArrayRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { linearSearch } from "@/lib/algorithms/search";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "buscar",
    label: "Buscar valor",
    inputs: [{ id: "target", label: "Valor a buscar", type: "number", placeholder: "23" }],
    run: (state, values) => linearSearch(state, Number(values.target)),
  },
];

export default function BuscaSequencialPlayground() {
  const initialState = useMemo(() => makeArrayState([42, 17, 8, 23, 4, 55, 16]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={ArrayRenderer}
      legend={[
        { label: "comparando", color: "var(--color-highlight-compare)" },
        { label: "encontrado", color: "var(--color-highlight-success)" },
      ]}
    />
  );
}
