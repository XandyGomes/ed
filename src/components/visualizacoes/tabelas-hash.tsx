"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { HashTableRenderer } from "@/components/visualizer/renderers/HashTableRenderer";
import { makeHashState, hashInsert, hashSearch, hashRemove } from "@/lib/algorithms/hashTable";
import { HASH_INSERT_CODE, HASH_SEARCH_CODE, HASH_REMOVE_CODE } from "@/lib/code/hashTable.code";
import type { HashState } from "@/lib/algorithms/hashTable";
import type { OperationDef } from "@/lib/types";

const operations: OperationDef<HashState>[] = [
  {
    id: "inserir",
    label: "Inserir valor",
    inputs: [{ id: "value", label: "Valor", type: "number", placeholder: "19" }],
    run: (state, values) => hashInsert(state, Number(values.value)),
  },
  {
    id: "buscar",
    label: "Buscar valor",
    inputs: [{ id: "value", label: "Valor a buscar", type: "number", placeholder: "12" }],
    run: (state, values) => hashSearch(state, Number(values.value)),
  },
  {
    id: "remover",
    label: "Remover valor",
    inputs: [{ id: "value", label: "Valor a remover", type: "number", placeholder: "12" }],
    run: (state, values) => hashRemove(state, Number(values.value)),
  },
];

export default function TabelasHashPlayground() {
  const initialState = useMemo(() => makeHashState(7, [10, 17, 23, 5, 12]), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={HashTableRenderer}
      code={{ inserir: HASH_INSERT_CODE, buscar: HASH_SEARCH_CODE, remover: HASH_REMOVE_CODE }}
      legend={[
        { label: "bucket ativo", color: "var(--color-primary)" },
        { label: "comparando", color: "var(--color-highlight-compare)" },
        { label: "encontrado", color: "var(--color-highlight-success)" },
        { label: "removendo", color: "var(--color-highlight-danger)" },
        { label: "recém-inserido", color: "var(--color-highlight-new)" },
      ]}
    />
  );
}
