import Link from "next/link";
import { topicosDisponiveis } from "@/data/topicos";

const FASE_LABEL: Record<number, string> = {
  1: "Bloco 1 · Fundamentos e estruturas lineares",
  2: "Bloco 1 · Estruturas encadeadas",
  3: "Bloco 2 · Árvores",
  4: "Bloco 2 · Tabelas hash",
  5: "Bloco 2 · Grafos",
};

const BIBLIOGRAFIA = [
  {
    autor: "ASCENCIO, Ana Fernanda Gomes; ARAÚJO, Graziela Santos de.",
    obra: "Estruturas de Dados: algoritmos, análise da complexidade e implementações em Java e C/C++.",
    editora: "São Paulo: Pearson Prentice Hall.",
  },
  {
    autor: "CORMEN, Thomas H. et al.",
    obra: "Algoritmos: teoria e prática.",
    editora: "Rio de Janeiro: Elsevier/Campus.",
  },
  {
    autor: "TENENBAUM, Aaron M.; LANGSAM, Yedidyah et al.",
    obra: "Estruturas de Dados usando C.",
    editora: "São Paulo: Makron Books.",
  },
  {
    autor: "GOODRICH, Michael T.; TAMASSIA, Roberto.",
    obra: "Estruturas de Dados e Algoritmos em Java.",
    editora: "Porto Alegre: Bookman.",
  },
  {
    autor: "DEITEL, Harvey M.; DEITEL, Paul J.",
    obra: "Java: como programar.",
    editora: "São Paulo: Pearson.",
  },
  {
    autor: "ZIVIANI, Nivio.",
    obra: "Projeto de Algoritmos com Implementações em Pascal e C.",
    editora: "São Paulo: Cengage Learning.",
  },
  {
    autor: "RISSETTI, Gelson; PUGA, Sandra.",
    obra: "Lógica de Programação e Estruturas de Dados.",
    editora: "São Paulo: Pearson.",
  },
  {
    autor: "SZWARCFITER, Jayme Luiz; MARKENZON, Lilian.",
    obra: "Estruturas de Dados e seus Algoritmos.",
    editora: "Rio de Janeiro: LTC.",
  },
];

export default function ProgramaPage() {
  const porFase = topicosDisponiveis.reduce<Record<number, typeof topicosDisponiveis>>((acc, t) => {
    (acc[t.fase] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
      >
        ← Todos os tópicos
      </Link>
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-primary)]">
        Estrutura de Dados
      </p>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Sobre a disciplina</h1>

      <section className="mb-12">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          Objetivo
        </h2>
        <p className="glass-panel rounded-2xl p-6 leading-relaxed text-[var(--color-foreground)]">
          Conhecer e aplicar os principais tipos abstratos de dados e como eles atuam em
          projetos de software: criar e manipular listas, pilhas, filas, árvores, tabelas hash
          e grafos, além de discutir os algoritmos de ordenação, busca e análise de
          complexidade por trás de cada um.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          Conteúdo Programático
        </h2>
        <p className="mb-5 text-sm text-[var(--color-muted)]">
          Roteiro completo de estudos, dos fundamentos às estruturas mais avançadas.
        </p>
        {Object.entries(porFase).map(([fase, itens]) => (
          <div key={fase} className="mb-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
              {FASE_LABEL[Number(fase)]}
            </h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {itens.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/estrutura/${t.slug}`}
                    className="block rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {t.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-muted)]">
          Referências Bibliográficas
        </h2>
        <ul className="glass-panel flex flex-col divide-y divide-[var(--color-border)] rounded-2xl">
          {BIBLIOGRAFIA.map((b, i) => (
            <li key={i} className="p-4 text-sm leading-relaxed">
              <span className="font-semibold text-[var(--color-foreground)]">{b.autor}</span>{" "}
              <span className="italic text-[var(--color-muted)]">{b.obra}</span>{" "}
              <span className="text-[var(--color-muted)]">{b.editora}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
