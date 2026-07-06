import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que cada nó de uma lista duplamente encadeada guarda, além do valor?",
    opcoes: [
      "Só um ponteiro para o próximo nó",
      "Ponteiros para o próximo e para o anterior",
      "O índice do nó",
      "Uma cópia de todos os outros nós",
    ],
    correta: 1,
    explicacao: "O ponteiro extra (prev) é o que permite navegar nos dois sentidos e remover do final em O(1).",
  },
  {
    id: "q2",
    enunciado: "Por que remover o último nó é O(1) na lista duplamente encadeada, mas O(n) na simples?",
    opcoes: [
      "Porque a lista dupla é sempre menor",
      "Porque o nó cauda tem um ponteiro prev que aponta direto para o novo último nó",
      "Porque a lista dupla mantém os valores ordenados",
      "Não há diferença de complexidade entre as duas",
    ],
    correta: 1,
    explicacao: "Na lista simples seria preciso percorrer todos os nós para achar o penúltimo; na dupla, o prev da cauda já aponta para ele.",
  },
  {
    id: "q3",
    enunciado: "Qual o principal custo de se ter uma lista duplamente encadeada em vez de simples?",
    opcoes: [
      "Busca fica O(log n)",
      "Cada nó usa mais memória (ponteiro extra) e atualizar dois ponteiros a cada operação",
      "Não é possível inserir no início",
      "A lista não pode crescer além de um tamanho fixo",
    ],
    correta: 1,
    explicacao: "O ganho de flexibilidade (navegação nos dois sentidos, remoção O(1) do final) tem um custo constante de memória e de manutenção dos ponteiros.",
  },
];
