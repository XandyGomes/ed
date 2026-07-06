import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Por que o acesso a um elemento de um array por índice é O(1)?",
    opcoes: [
      "Porque o array é sempre pequeno",
      "Porque o endereço de memória pode ser calculado diretamente a partir do índice",
      "Porque o array está sempre ordenado",
      "Porque o computador guarda uma cópia de cada elemento",
    ],
    correta: 1,
    explicacao:
      "Elementos ficam em posições contíguas de memória, então o endereço de qualquer índice é calculado com uma fórmula direta.",
  },
  {
    id: "q2",
    enunciado: "Inserir um elemento no início de um array com n elementos é, no pior caso:",
    opcoes: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correta: 1,
    explicacao: "Todos os n elementos existentes precisam se deslocar uma posição para abrir espaço no início.",
  },
  {
    id: "q3",
    enunciado: "Remover o último elemento de um array costuma ser:",
    opcoes: ["O(n²)", "O(log n)", "O(1)", "Impossível"],
    correta: 2,
    explicacao: "Como nenhum outro elemento precisa se mover, remover do final é uma operação de tempo constante.",
  },
];
