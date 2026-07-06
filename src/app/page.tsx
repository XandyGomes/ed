import Link from "next/link";
import clsx from "clsx";
import { topicos } from "@/data/topicos";

const FASE_LABEL: Record<number, string> = {
  1: "Fase 1, Fundamentos e estruturas lineares",
  2: "Fase 2, Estruturas ligadas",
  3: "Fase 3, Árvores",
  4: "Fase 4, Tabelas hash",
  5: "Fase 5, Grafos",
};

export default function Home() {
  const porFase = topicos.reduce<Record<number, typeof topicos>>((acc, t) => {
    (acc[t.fase] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          Estrutura de Dados, na prática
        </h1>
        <p className="mx-auto max-w-2xl text-[var(--color-muted)]">
          Lições curtas, visualizações interativas passo a passo e exercícios
          práticos, em português, para acompanhar as aulas.
        </p>
      </section>

      {Object.entries(porFase).map(([fase, itens]) => (
        <section key={fase} className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-muted)]">
            {FASE_LABEL[Number(fase)]}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {itens.map((t) => {
              const disponivel = t.status === "disponivel";
              const card = (
                <div
                  className={clsx(
                    "h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-shadow",
                    disponivel ? "hover:shadow-md" : "opacity-60"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{t.titulo}</h3>
                    {!disponivel && (
                      <span className="rounded-full bg-[var(--color-surface-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-muted)]">
                        em breve
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-muted)]">{t.descricao}</p>
                </div>
              );
              return disponivel ? (
                <Link key={t.slug} href={`/estrutura/${t.slug}`}>
                  {card}
                </Link>
              ) : (
                <div key={t.slug}>{card}</div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
