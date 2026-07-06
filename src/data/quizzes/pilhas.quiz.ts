import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "Em uma pilha, qual elemento é removido primeiro pelo pop()?",
    opcoes: ["O primeiro que foi inserido", "O último que foi inserido", "O maior valor", "Um elemento aleatório"],
    correta: 1,
    explicacao: "Pilhas são LIFO (Last In, First Out): o último elemento inserido é o primeiro a sair.",
  },
  {
    id: "q2",
    enunciado: "Qual estrutura de dados está por trás do botão 'Voltar' do navegador?",
    opcoes: ["Fila", "Pilha", "Tabela hash", "Árvore"],
    correta: 1,
    explicacao: "Cada página visitada é empilhada; 'Voltar' faz um pop para retornar à página anterior.",
  },
  {
    id: "q3",
    enunciado: "O que acontece ao chamar pop() em uma pilha vazia?",
    opcoes: ["Retorna 0", "É uma operação inválida — não há topo para remover", "Cria um novo elemento", "Remove o elemento mais antigo"],
    correta: 1,
    explicacao: "Não existe elemento no topo de uma pilha vazia, então pop() e peek() não podem ser executados.",
  },
];
