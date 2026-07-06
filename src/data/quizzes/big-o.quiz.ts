import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Qual a complexidade de acessar um elemento de um array pelo índice?",
    opcoes: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correta: 0,
    explicacao:
      "Acesso por índice em um array é direto (cálculo de endereço de memória), não depende do tamanho do array.",
  },
  {
    id: "q2",
    enunciado: "Um laço 'for' simples que percorre todos os n elementos de um array uma única vez tem complexidade:",
    opcoes: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
    correta: 1,
    explicacao: "Cada elemento é visitado exatamente uma vez, então o número de operações cresce linearmente com n.",
  },
  {
    id: "q3",
    enunciado: "Dois laços 'for' aninhados, ambos percorrendo os n elementos de um array, resultam em complexidade:",
    opcoes: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
    correta: 2,
    explicacao: "Para cada um dos n elementos do laço externo, o laço interno executa outras n operações: n × n = O(n²).",
  },
  {
    id: "q4",
    enunciado: "A busca binária tem complexidade O(log n) porque:",
    opcoes: [
      "Ela verifica todos os elementos, mas rapidamente",
      "A cada passo, ela elimina metade dos elementos restantes",
      "Ela usa uma tabela hash internamente",
      "Ela só funciona em arrays pequenos",
    ],
    correta: 1,
    explicacao:
      "Ao descartar metade do espaço de busca a cada iteração, o número de passos necessários cresce apenas com o logaritmo de n.",
  },
];
