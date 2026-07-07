"use client";

import { useMemo } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { ObjetoRenderer } from "@/components/visualizer/renderers/ObjetoRenderer";
import { makeObjetoState, criarObjetoLivre, criarComClasse } from "@/lib/algorithms/objetoClasse";
import type { ObjetoState } from "@/lib/algorithms/objetoClasse";
import type { OperationDef } from "@/lib/types";

const inputs = [
  { id: "base", label: "base", type: "text" as const, placeholder: "15" },
  { id: "altura", label: "altura", type: "text" as const, placeholder: "16" },
  { id: "tipo", label: "tipo (R/T/E)", type: "text" as const, placeholder: "T" },
];

const operations: OperationDef<ObjetoState>[] = [
  {
    id: "livre",
    label: "Criar objeto livre (sem classe)",
    inputs,
    run: (state, values) => criarObjetoLivre(state, values.base ?? "", values.altura ?? "", values.tipo ?? ""),
  },
  {
    id: "classe",
    label: "Criar com a classe FormaGeometrica",
    inputs,
    run: (state, values) => criarComClasse(state, values.base ?? "", values.altura ?? "", values.tipo ?? ""),
  },
];

export default function ObjetosEClassesPlayground() {
  const initialState = useMemo(() => makeObjetoState(), []);

  return (
    <StructurePlayground
      initialState={initialState}
      operations={operations}
      Renderer={ObjetoRenderer}
      legend={[
        { label: "aceito pelo setter", color: "var(--color-highlight-success)" },
        { label: "rejeitado pelo setter", color: "var(--color-highlight-danger)" },
        { label: "sem validação (objeto livre)", color: "var(--color-highlight-new)" },
      ]}
    />
  );
}
