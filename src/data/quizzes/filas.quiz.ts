import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Em uma fila, qual elemento é removido primeiro pelo dequeue()?",
    opcoes: ["O último que foi inserido", "O primeiro que foi inserido", "O maior valor", "Um elemento aleatório"],
    correta: 1,
    explicacao: "Filas são FIFO (First In, First Out): o primeiro elemento inserido é o primeiro a sair.",
  },
  {
    id: "q2",
    enunciado: "Qual algoritmo de travessia de grafos usa uma fila internamente?",
    opcoes: ["Busca em profundidade (DFS)", "Busca em largura (BFS)", "Busca binária", "Ordenação por inserção"],
    correta: 1,
    explicacao: "BFS explora os vizinhos mais próximos primeiro, usando uma fila para manter a ordem de visita.",
  },
];
