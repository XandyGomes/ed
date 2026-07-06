import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que diferencia um deque de uma fila comum?",
    opcoes: [
      "O deque só permite remover elementos",
      "O deque permite inserir e remover nas duas extremidades",
      "O deque não tem tamanho máximo",
      "Não há diferença",
    ],
    correta: 1,
    explicacao: "Um deque (double-ended queue) permite operações de inserção e remoção tanto na frente quanto no final.",
  },
  {
    id: "q2",
    enunciado: "Um deque pode ser usado para simular uma pilha?",
    opcoes: ["Não, nunca", "Sim, usando sempre a mesma extremidade", "Só se os valores forem inteiros", "Só com no máximo 2 elementos"],
    correta: 1,
    explicacao: "Se você sempre inserir e remover pela mesma ponta, o deque se comporta exatamente como uma pilha (LIFO).",
  },
];
