import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Qual a complexidade média de inserção, busca e remoção em uma tabela hash bem dimensionada?",
    opcoes: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correta: 0,
    explicacao: "Com uma boa função de hash e poucas colisões, essas operações são O(1) em média.",
  },
  {
    id: "q2",
    enunciado: "O que é uma 'colisão' em uma tabela hash?",
    opcoes: [
      "Quando dois valores diferentes produzem o mesmo índice de bucket",
      "Quando a tabela fica vazia",
      "Um erro que trava o programa",
      "Quando o valor inserido é negativo",
    ],
    correta: 0,
    explicacao: "Colisão é quando hash(a) == hash(b) para valores a ≠ b, exigindo uma estratégia de resolução, como o encadeamento.",
  },
  {
    id: "q3",
    enunciado: "Como o encadeamento (chaining) resolve colisões?",
    opcoes: [
      "Rejeitando o segundo valor",
      "Cada bucket guarda uma lista de todos os itens que colidiram ali",
      "Removendo o primeiro valor automaticamente",
      "Aumentando o valor até não colidir mais",
    ],
    correta: 1,
    explicacao: "Cada bucket vira uma pequena lista; itens que colidem simplesmente se acumulam nessa lista.",
  },
  {
    id: "q4",
    enunciado: "O que acontece com a performance de uma tabela hash se o fator de carga ficar muito alto sem redimensionamento?",
    opcoes: [
      "Nada muda",
      "As cadeias ficam mais longas e as operações se aproximam de O(n)",
      "A tabela fica automaticamente mais rápida",
      "A tabela para de aceitar novos valores",
    ],
    correta: 1,
    explicacao: "Com cadeias longas, buscar/inserir/remover exige percorrer mais itens, degradando a complexidade em direção a O(n).",
  },
];
