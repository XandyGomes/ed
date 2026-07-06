"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { ArrayRenderer } from "@/components/visualizer/renderers/ArrayRenderer";
import { makeArrayState } from "@/lib/algorithms/common";
import { binarySearch } from "@/lib/algorithms/search";
import type { ArrayState, OperationDef } from "@/lib/types";

const operations: OperationDef<ArrayState>[] = [
  {
    id: "buscar",
    label: "Buscar valor (array ordenado)",
    inputs: [{ id: "target", label: "Valor a buscar", type: "number", placeholder: "23" }],
    run: (state, values) => binarySearch(state, Number(values.target)),
  },
];

export default function BuscaBinariaPlayground() {
  const initialState = useMemo(() => makeArrayState([4, 8, 16, 17, 23, 42, 55]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={ArrayRenderer}
      legend={[
        { label: "meio (comparando)", color: "var(--color-highlight-compare)" },
        { label: "encontrado", color: "var(--color-highlight-success)" },
      ]}
    />
  );
}
