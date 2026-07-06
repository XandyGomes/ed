import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "A busca sequencial exige que o array esteja ordenado?",
    opcoes: ["Sim, sempre", "Não, funciona em qualquer ordem", "Só para arrays grandes", "Só para números"],
    correta: 1,
    explicacao: "A busca sequencial compara elemento a elemento, então funciona independentemente da ordem dos dados.",
  },
  {
    id: "q2",
    enunciado: "Qual é o pior caso de complexidade da busca sequencial em um array de n elementos?",
    opcoes: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correta: 2,
    explicacao: "No pior caso (elemento no final ou ausente), todos os n elementos são examinados.",
  },
];
