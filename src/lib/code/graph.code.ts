import type { LanguageSource } from "./bubbleSort.code";
import type { CodeLanguage } from "./languages";

export const GRAPH_BFS_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void bfs(String start) {
    Queue<String> fila = new LinkedList<>();
    Set<String> visitado = new HashSet<>();
    fila.add(start);
    visitado.add(start);
    while (!fila.isEmpty()) {
        String atual = fila.poll();
        visitar(atual);
        for (String vizinho : vizinhosDe(atual)) {
            if (!visitado.contains(vizinho)) {
                visitado.add(vizinho);
                fila.add(vizinho);
            }
        }
    }
}`,
    lineFor: { start: 4, visit: 7, "add-neighbors": 12 },
  },
  python: {
    code: `def bfs(self, start):
    fila = deque([start])
    visitado = {start}
    while fila:
        atual = fila.popleft()
        visitar(atual)
        for vizinho in self.vizinhos_de(atual):
            if vizinho not in visitado:
                visitado.add(vizinho)
                fila.append(vizinho)`,
    lineFor: { start: 2, visit: 6, "add-neighbors": 10 },
  },
  cpp: {
    code: `void bfs(string start) {
    queue<string> fila;
    set<string> visitado;
    fila.push(start);
    visitado.insert(start);
    while (!fila.empty()) {
        string atual = fila.front();
        fila.pop();
        visitar(atual);
        for (string vizinho : vizinhosDe(atual)) {
            if (!visitado.count(vizinho)) {
                visitado.insert(vizinho);
                fila.push(vizinho);
            }
        }
    }
}`,
    lineFor: { start: 4, visit: 9, "add-neighbors": 13 },
  },
  javascript: {
    code: `bfs(start) {
    const fila = [start];
    const visitado = new Set([start]);
    while (fila.length > 0) {
        const atual = fila.shift();
        visitar(atual);
        for (const vizinho of this.vizinhosDe(atual)) {
            if (!visitado.has(vizinho)) {
                visitado.add(vizinho);
                fila.push(vizinho);
            }
        }
    }
}`,
    lineFor: { start: 2, visit: 6, "add-neighbors": 10 },
  },
};

export const GRAPH_DFS_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void dfs(String atual, Set<String> visitado) {
    visitado.add(atual);
    visitar(atual);
    for (String vizinho : vizinhosDe(atual)) {
        if (!visitado.contains(vizinho)) {
            dfs(vizinho, visitado);
        }
    }
}`,
    lineFor: { visit: 3, descend: 6 },
  },
  python: {
    code: `def dfs(self, atual, visitado):
    visitado.add(atual)
    visitar(atual)
    for vizinho in self.vizinhos_de(atual):
        if vizinho not in visitado:
            self.dfs(vizinho, visitado)`,
    lineFor: { visit: 3, descend: 6 },
  },
  cpp: {
    code: `void dfs(string atual, set<string>& visitado) {
    visitado.insert(atual);
    visitar(atual);
    for (string vizinho : vizinhosDe(atual)) {
        if (!visitado.count(vizinho)) {
            dfs(vizinho, visitado);
        }
    }
}`,
    lineFor: { visit: 3, descend: 6 },
  },
  javascript: {
    code: `dfs(atual, visitado) {
    visitado.add(atual);
    visitar(atual);
    for (const vizinho of this.vizinhosDe(atual)) {
        if (!visitado.has(vizinho)) {
            this.dfs(vizinho, visitado);
        }
    }
}`,
    lineFor: { visit: 3, descend: 6 },
  },
};

export const GRAPH_DIJKSTRA_CODE: Record<CodeLanguage, LanguageSource> = {
  java: {
    code: `void dijkstra(String start) {
    Map<String, Integer> dist = new HashMap<>();
    for (String id : nos) dist.put(id, id.equals(start) ? 0 : Integer.MAX_VALUE);
    Set<String> visitado = new HashSet<>();

    while (visitado.size() < nos.size()) {
        String atual = menorDistanciaNaoVisitado(dist, visitado);
        if (atual == null) break;
        visitado.add(atual);

        for (Aresta a : arestasDe(atual)) {
            if (visitado.contains(a.destino)) continue;
            int novaDist = dist.get(atual) + a.peso;
            if (novaDist < dist.get(a.destino)) {
                dist.put(a.destino, novaDist);
            }
        }
    }
}`,
    lineFor: { start: 3, "select-min": 7, process: 9, relax: 15 },
  },
  python: {
    code: `def dijkstra(self, start):
    dist = {id: 0 if id == start else float("inf") for id in self.nos}
    visitado = set()

    while len(visitado) < len(self.nos):
        atual = self.menor_distancia_nao_visitado(dist, visitado)
        if atual is None:
            break
        visitado.add(atual)

        for destino, peso in self.arestas_de(atual):
            if destino in visitado:
                continue
            nova_dist = dist[atual] + peso
            if nova_dist < dist[destino]:
                dist[destino] = nova_dist`,
    lineFor: { start: 2, "select-min": 6, process: 9, relax: 16 },
  },
  cpp: {
    code: `void dijkstra(string start) {
    unordered_map<string, int> dist;
    for (auto& id : nos) dist[id] = (id == start) ? 0 : INT_MAX;
    set<string> visitado;

    while (visitado.size() < nos.size()) {
        string atual = menorDistanciaNaoVisitado(dist, visitado);
        if (atual.empty()) break;
        visitado.insert(atual);

        for (auto& [destino, peso] : arestasDe(atual)) {
            if (visitado.count(destino)) continue;
            int novaDist = dist[atual] + peso;
            if (novaDist < dist[destino]) {
                dist[destino] = novaDist;
            }
        }
    }
}`,
    lineFor: { start: 3, "select-min": 7, process: 9, relax: 15 },
  },
  javascript: {
    code: `dijkstra(start) {
    const dist = {};
    for (const id of this.nos) dist[id] = id === start ? 0 : Infinity;
    const visitado = new Set();

    while (visitado.size < this.nos.length) {
        const atual = this.menorDistanciaNaoVisitado(dist, visitado);
        if (atual === null) break;
        visitado.add(atual);

        for (const { destino, peso } of this.arestasDe(atual)) {
            if (visitado.has(destino)) continue;
            const novaDist = dist[atual] + peso;
            if (novaDist < dist[destino]) {
                dist[destino] = novaDist;
            }
        }
    }
}`,
    lineFor: { start: 3, "select-min": 7, process: 9, relax: 15 },
  },
};

export const GRAPH_ADD_NODE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `void addNode(String label) {\n    nos.add(label);\n    recalcularLayout();\n}`, lineFor: { prepare: 1, add: 2 } },
  python: { code: `def add_node(self, label):\n    self.nos.append(label)\n    self.recalcular_layout()`, lineFor: { prepare: 1, add: 2 } },
  cpp: { code: `void addNode(string label) {\n    nos.push_back(label);\n    recalcularLayout();\n}`, lineFor: { prepare: 1, add: 2 } },
  javascript: { code: `addNode(label) {\n    this.nos.push(label);\n    this.recalcularLayout();\n}`, lineFor: { prepare: 1, add: 2 } },
};

export const GRAPH_ADD_EDGE_CODE: Record<CodeLanguage, LanguageSource> = {
  java: { code: `void addEdge(String from, String to, int peso) {\n    arestas.add(new Aresta(from, to, peso));\n}`, lineFor: { prepare: 1, add: 2 } },
  python: { code: `def add_edge(self, origem, destino, peso):\n    self.arestas.append((origem, destino, peso))`, lineFor: { prepare: 1, add: 2 } },
  cpp: { code: `void addEdge(string from, string to, int peso) {\n    arestas.push_back({from, to, peso});\n}`, lineFor: { prepare: 1, add: 2 } },
  javascript: { code: `addEdge(from, to, peso) {\n    this.arestas.push({ from, to, peso });\n}`, lineFor: { prepare: 1, add: 2 } },
};
