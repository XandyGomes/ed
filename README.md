# 🧮 Estrutura de Dados

> Site interativo de Estrutura de Dados: lições em português, animações passo a passo dos algoritmos e quizzes de prática, para as turmas onde leciono a disciplina.

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub_Pages-222?style=for-the-badge&logo=github)](https://xandygomes.github.io/ed/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Motion](https://img.shields.io/badge/Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev)

---

## ✨ Sobre o projeto

20 tópicos cobrindo toda a ementa da disciplina, cada um com três partes:

- **📖 Lição**: conteúdo em texto (MDX), com exemplos, complexidade e contexto histórico/aplicado.
- **🎬 Visualização**: animação interativa passo a passo do algoritmo rodando de verdade, com play/pause, avançar/voltar passo, controle de velocidade e narração.
- **✏️ Prática**: quiz de múltipla escolha com feedback imediato.

O site unifica, num só lugar e sem depender de nenhuma linguagem de programação específica, o material que antes estava espalhado em apostilas separadas por instituição. O código de exemplo em cada linguagem continua nos repositórios específicos de cada turma no meu GitHub.

## 📚 Conteúdo

- **Fundamentos e arrays**: Big-O, Arrays, Busca Sequencial, Busca Binária, Bubble Sort, Selection Sort, Recursividade, Merge Sort, Quick Sort, Matriz Esparsa.
- **Estruturas lineares**: Pilhas, Filas, Deque, Listas Ligadas, Listas Duplamente Encadeadas.
- **Árvores**: Árvores Binárias/BST, Heaps, Árvores AVL.
- **Tabelas Hash**: função de hash, colisões e encadeamento.
- **Grafos**: representação, BFS, DFS, Dijkstra, história (Pontes de Königsberg), aplicações reais e sandbox para montar seu próprio grafo.

Vários tópicos também têm o PDF da aula disponível para download direto na página.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router), exportado como site 100% estático
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações:** [Motion](https://motion.dev/)
- **Conteúdo:** [MDX](https://mdxjs.com/) (`@next/mdx`)

### Motor de animação

Cada operação de algoritmo (inserir, buscar, comparar, rotacionar...) é compilada em uma sequência de *frames*: um snapshot do estado da estrutura, destaques visuais e uma narração em português. Um hook e um player genéricos (`useVisualizer` + `VisualizerControls`) reproduzem essa sequência para qualquer estrutura de dados, então a lógica do algoritmo e a animação nunca ficam dessincronizadas.

## 🚀 Como executar o projeto

Pré-requisito: Node.js 18+.

```bash
git clone https://github.com/XandyGomes/ed.git
cd ed
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para gerar o build estático (o mesmo publicado no GitHub Pages):

```bash
npm run build
```

O resultado fica em `out/`.

## 👨‍🏫 Desenvolvido por

**Prof. Alexandre Gomes da Silva** ([Xandy Gomes](https://github.com/XandyGomes)) — professor de Estrutura de Dados na FATEC, Uni-FACEF, SENAI e Anhanguera, Mestre em Computação Aplicada pela USP.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
