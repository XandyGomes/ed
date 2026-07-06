import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Por que inserir no início de uma lista ligada é O(1)?",
    opcoes: [
      "Porque a lista é sempre pequena",
      "Porque basta apontar o novo nó para o antigo início e mover a cabeça, sem mover outros nós",
      "Porque os nós ficam em posições contíguas de memória",
      "Porque a lista mantém um índice",
    ],
    correta: 1,
    explicacao: "Diferente do array, nenhum outro nó precisa se mover: só ajustamos dois ponteiros.",
  },
  {
    id: "q2",
    enunciado: "Sem um ponteiro de cauda, inserir no final de uma lista ligada é:",
    opcoes: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correta: 2,
    explicacao: "É preciso percorrer todos os nós, um a um, até encontrar o último (que aponta para NULL).",
  },
  {
    id: "q3",
    enunciado: "É possível acessar diretamente o 5º elemento de uma lista ligada, como fazemos com array[4]?",
    opcoes: [
      "Sim, o acesso é O(1) igual ao array",
      "Não, é preciso percorrer os nós anteriores um a um até chegar lá",
      "Só se a lista estiver ordenada",
      "Só em listas duplamente encadeadas",
    ],
    correta: 1,
    explicacao: "Não existe acesso direto por índice em listas ligadas: para chegar ao nó N, é preciso passar pelos N-1 anteriores.",
  },
];
