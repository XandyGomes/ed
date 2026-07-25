"use client";

import { useMemo, useState } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { GraphRenderer } from "@/components/visualizer/renderers/GraphRenderer";
import { GraphRepresentations } from "@/components/visualizacoes/GraphRepresentations";
import { makeGraphState, graphBFS, graphDFS, graphAddNode, graphAddEdge } from "@/lib/algorithms/graph";
import { graphDijkstra } from "@/lib/algorithms/dijkstra";
import {
  GRAPH_BFS_CODE,
  GRAPH_DFS_CODE,
  GRAPH_DIJKSTRA_CODE,
  GRAPH_ADD_NODE_CODE,
  GRAPH_ADD_EDGE_CODE,
} from "@/lib/code/graph.code";
import type { GraphState } from "@/lib/algorithms/graph";
import type { OperationDef } from "@/lib/types";

const operations: OperationDef<GraphState>[] = [
  {
    id: "bfs",
    label: "BFS (busca em largura)",
    inputs: [{ id: "start", label: "Nó inicial", type: "text", placeholder: "A" }],
    run: (state, values) => graphBFS(state, values.start ?? ""),
  },
  {
    id: "dfs",
    label: "DFS (busca em profundidade)",
    inputs: [{ id: "start", label: "Nó inicial", type: "text", placeholder: "A" }],
    run: (state, values) => graphDFS(state, values.start ?? ""),
  },
  {
    id: "dijkstra",
    label: "Dijkstra (caminho mínimo)",
    inputs: [{ id: "start", label: "Nó inicial", type: "text", placeholder: "A" }],
    run: (state, values) => graphDijkstra(state, values.start ?? ""),
  },
  {
    id: "add-node",
    label: "Sandbox: adicionar nó",
    inputs: [{ id: "label", label: "Nome do nó", type: "text", placeholder: "G" }],
    run: (state, values) => graphAddNode(state, values.label ?? ""),
  },
  {
    id: "add-edge",
    label: "Sandbox: conectar dois nós",
    inputs: [
      { id: "from", label: "De", type: "text", placeholder: "A" },
      { id: "to", label: "Para", type: "text", placeholder: "G" },
      { id: "weight", label: "Peso", type: "number", placeholder: "1" },
    ],
    run: (state, values) => graphAddEdge(state, values.from ?? "", values.to ?? "", values.weight ?? ""),
  },
];

export default function GrafosPlayground() {
  const initialState = useMemo(() => makeGraphState(), []);
  const [liveState, setLiveState] = useState<GraphState>(initialState);

  return (
    <div className="flex flex-col gap-6">
      <StructurePlayground
        initialState={initialState}
        operations={operations}
        Renderer={GraphRenderer}
        onStateChange={setLiveState}
        code={{
          bfs: GRAPH_BFS_CODE,
          dfs: GRAPH_DFS_CODE,
          dijkstra: GRAPH_DIJKSTRA_CODE,
          "add-node": GRAPH_ADD_NODE_CODE,
          "add-edge": GRAPH_ADD_EDGE_CODE,
        }}
        legend={[
          { label: "atual", color: "var(--color-highlight-compare)" },
          { label: "na fila/pilha", color: "var(--color-highlight-new)" },
          { label: "visitado", color: "var(--color-highlight-visit)" },
          { label: "concluído", color: "var(--color-highlight-success)" },
        ]}
      />
      <GraphRepresentations state={liveState} />
    </div>
  );
}
