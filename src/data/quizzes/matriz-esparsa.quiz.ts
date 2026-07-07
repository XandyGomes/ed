import type { QuizQuestion } from "@/lib/types";

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    enunciado: "O que caracteriza uma matriz esparsa?",
    opcoes: [
      "Uma matriz sem nenhum valor zero",
      "Uma matriz onde a grande maioria dos valores é zero",
      "Uma matriz quadrada",
      "Uma matriz com menos de 10 elementos",
    ],
    correta: 1,
    explicacao: "O termo 'esparsa' se refere justamente à baixa densidade de valores não-zero.",
  },
  {
    id: "q2",
    enunciado: "Como a representação esparsa guarda os dados?",
    opcoes: [
      "Guardando todos os valores, incluindo os zeros",
      "Guardando apenas triplas (linha, coluna, valor) para os elementos não-zero",
      "Guardando só o maior valor da matriz",
      "Comprimindo a matriz em uma imagem",
    ],
    correta: 1,
    explicacao: "Só os elementos não-zero são armazenados, cada um com sua posição (linha, coluna) e valor.",
  },
  {
    id: "q3",
    enunciado: "Qual é o principal trade-off (contrapartida) de usar uma matriz esparsa?",
    opcoes: [
      "Nenhum, ela é sempre superior à densa",
      "Acesso a um elemento específico fica mais lento (O(k) em vez de O(1)), mas economiza muita memória",
      "Ela não pode representar valores negativos",
      "Ela só funciona com matrizes quadradas",
    ],
    correta: 1,
    explicacao: "A representação densa acessa qualquer posição em O(1); a esparsa precisa procurar entre as triplas guardadas, mais lento, mas usa muito menos memória quando há poucos valores não-zero.",
  },
  {
    id: "q4",
    enunciado: "Por que uma imagem simples, com fundo sólido, é um bom exemplo de matriz esparsa?",
    opcoes: [
      "Porque toda imagem digital tem exatamente o mesmo número de linhas e colunas",
      "Porque, convertida para escala de cinza, uma área de fundo sólido (por exemplo, preto puro) gera muitos valores zero repetidos",
      "Porque imagens não podem ser representadas como matrizes",
      "Porque o fundo sólido sempre tem o maior valor da matriz",
    ],
    correta: 1,
    explicacao: "Cada pixel vira um valor de 0 a 255 em escala de cinza; um fundo sólido preto gera muitos zeros seguidos, exatamente o padrão que a representação esparsa aproveita.",
  },
  {
    id: "q5",
    enunciado: "Para reconstruir a matriz densa a partir da representação esparsa, o que se faz com as posições que não aparecem na lista de triplas?",
    opcoes: [
      "Elas são ignoradas e ficam sem valor definido",
      "Elas são preenchidas com zero",
      "Elas recebem o último valor lido",
      "A reconstrução não é possível sem guardar todas as posições",
    ],
    correta: 1,
    explicacao: "A lista esparsa guarda só os valores não-zero; qualquer posição ausente na lista é, por definição, zero na matriz densa reconstruída.",
  },
];
