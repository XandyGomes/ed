import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Qual pré-condição a busca binária exige?",
    opcoes: ["O array precisa estar ordenado", "O array precisa ter tamanho par", "O array precisa ter apenas números positivos", "Não há pré-condição"],
    correta: 0,
    explicacao: "A busca binária descarta metade do intervalo assumindo a ordenação — sem isso, o algoritmo não funciona corretamente.",
  },
  {
    id: "q2",
    enunciado: "Se array[meio] for maior que o valor procurado, o que fazemos?",
    opcoes: [
      "Descartamos a metade esquerda",
      "Descartamos a metade direita",
      "Recomeçamos do início",
      "Concluímos que o valor não existe",
    ],
    correta: 1,
    explicacao: "Como o array está ordenado, se o valor do meio é maior que o alvo, o alvo só pode estar à esquerda — descartamos a direita.",
  },
  {
    id: "q3",
    enunciado: "Para um array de 1.000.000 de elementos, aproximadamente quantas comparações a busca binária faz no pior caso?",
    opcoes: ["~20", "~1.000", "~500.000", "~1.000.000"],
    correta: 0,
    explicacao: "log2(1.000.000) ≈ 20 — o crescimento logarítmico é extremamente lento comparado a n.",
  },
];
