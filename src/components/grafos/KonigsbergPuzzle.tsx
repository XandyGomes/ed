"use client";

import { useMemo, useState } from "react";

type IlhaId = "A" | "B" | "C" | "D";

const ILHAS: Record<IlhaId, { x: number; y: number; nome: string }> = {
  A: { x: 150, y: 40, nome: "Norte" },
  B: { x: 150, y: 220, nome: "Sul" },
  C: { x: 260, y: 130, nome: "Leste" },
  D: { x: 40, y: 130, nome: "Oeste" },
};

type Ponte = { id: string; de: IlhaId; para: IlhaId; curva: number };

const PONTES: Ponte[] = [
  { id: "p1", de: "A", para: "D", curva: 18 },
  { id: "p2", de: "A", para: "D", curva: -18 },
  { id: "p3", de: "A", para: "C", curva: 0 },
  { id: "p4", de: "B", para: "D", curva: 18 },
  { id: "p5", de: "B", para: "D", curva: -18 },
  { id: "p6", de: "B", para: "C", curva: 0 },
  { id: "p7", de: "C", para: "D", curva: 0 },
];

function pontoMedio(p: Ponte) {
  const a = ILHAS[p.de];
  const b = ILHAS[p.para];
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  if (!p.curva) return { x: mx, y: my, cx: mx, cy: my };
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * p.curva;
  const cy = my + ny * p.curva;
  return { x: 0.25 * a.x + 0.5 * cx + 0.25 * b.x, y: 0.25 * a.y + 0.5 * cy + 0.25 * b.y, cx, cy };
}

export function KonigsbergPuzzle() {
  const [atual, setAtual] = useState<IlhaId>("A");
  const [usadas, setUsadas] = useState<Set<string>>(new Set());
  const [mensagem, setMensagem] = useState(
    "Você está na ilha Norte. Clique em outra ilha para começar por ela, ou clique numa ponte para atravessar."
  );

  const naoUsadas = PONTES.filter((p) => !usadas.has(p.id));
  const travado = usadas.size > 0 && !naoUsadas.some((p) => p.de === atual || p.para === atual);

  function escolherInicio(ilha: IlhaId) {
    if (usadas.size > 0) return;
    setAtual(ilha);
    setMensagem(`Início definido: ${ILHAS[ilha].nome}. Agora clique numa ponte conectada a essa ilha.`);
  }

  function atravessar(ponte: Ponte) {
    if (usadas.has(ponte.id)) return;
    if (ponte.de !== atual && ponte.para !== atual) {
      setMensagem(`Essa ponte não toca a ilha ${ILHAS[atual].nome}. Escolha uma ponte conectada a ela.`);
      return;
    }
    const destino = ponte.de === atual ? ponte.para : ponte.de;
    const novasUsadas = new Set(usadas).add(ponte.id);
    setUsadas(novasUsadas);
    setAtual(destino);
    const restantes = PONTES.length - novasUsadas.size;
    const podeContinuar = PONTES.some((p) => !novasUsadas.has(p.id) && (p.de === destino || p.para === destino));
    if (restantes === 0) {
      setMensagem(`Você atravessou todas as 7 pontes! Confira: cada ilha tem grau ímpar, então em algum momento você repetiu o "sentido" sem perceber, ou começou torcendo para dar certo. Tente de novo prestando atenção em quantas pontes sobram de cada ilha.`);
    } else if (!podeContinuar) {
      setMensagem(
        `Travado! Restam ${restantes} ponte(s), mas nenhuma toca a ilha ${ILHAS[destino].nome} sem repetir. Isso não é falta de sorte: as 4 ilhas de Königsberg têm um número ímpar de pontes, e Euler provou em 1736 que isso torna o passeio impossível.`
      );
    } else {
      setMensagem(`Você atravessou para ${ILHAS[destino].nome}. Faltam ${restantes} ponte(s).`);
    }
  }

  function reiniciar() {
    setAtual("A");
    setUsadas(new Set());
    setMensagem("Passeio reiniciado. Clique em outra ilha para escolher onde começar, ou já clique numa ponte a partir de Norte.");
  }

  const grauPorIlha = useMemo(() => {
    const graus: Record<IlhaId, number> = { A: 0, B: 0, C: 0, D: 0 };
    PONTES.forEach((p) => {
      graus[p.de] += 1;
      graus[p.para] += 1;
    });
    return graus;
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Tente atravessar as 7 pontes</h3>
        <button
          type="button"
          onClick={reiniciar}
          className="rounded-md border border-[var(--color-border)] px-3 py-1 text-xs transition-colors hover:bg-[var(--color-surface-muted)]"
        >
          Reiniciar
        </button>
      </div>

      <svg viewBox="0 0 300 260" className="mx-auto h-auto w-full max-w-sm">
        {PONTES.map((p) => {
          const a = ILHAS[p.de];
          const b = ILHAS[p.para];
          const m = pontoMedio(p);
          const usada = usadas.has(p.id);
          const tocaAtual = !usada && (p.de === atual || p.para === atual);
          const path = p.curva
            ? `M ${a.x} ${a.y} Q ${m.cx} ${m.cy} ${b.x} ${b.y}`
            : `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
          return (
            <g key={p.id}>
              <path
                d={path}
                fill="none"
                stroke={usada ? "var(--color-border)" : "var(--color-highlight-new)"}
                strokeWidth={usada ? 4 : 6}
                strokeLinecap="round"
                opacity={usada ? 0.4 : 1}
                onClick={() => atravessar(p)}
                style={{ cursor: usada ? "default" : "pointer" }}
              />
              {!usada && (
                <circle
                  cx={m.x}
                  cy={m.y}
                  r={9}
                  fill={tocaAtual ? "var(--color-highlight-success)" : "var(--color-surface)"}
                  stroke="var(--color-border-strong)"
                  onClick={() => atravessar(p)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </g>
          );
        })}

        {(Object.keys(ILHAS) as IlhaId[]).map((id) => {
          const ilha = ILHAS[id];
          const ativa = id === atual;
          return (
            <g key={id} onClick={() => escolherInicio(id)} style={{ cursor: usadas.size === 0 ? "pointer" : "default" }}>
              <circle
                cx={ilha.x}
                cy={ilha.y}
                r={26}
                fill={ativa ? "var(--color-highlight-success)" : "var(--color-primary)"}
                opacity={0.9}
              />
              <text x={ilha.x} y={ilha.y + 4} textAnchor="middle" fontSize={12} fill="#1a1206" fontWeight={600}>
                {ilha.nome}
              </text>
            </g>
          );
        })}
      </svg>

      <p
        role="status"
        className={`mt-3 rounded-lg border px-4 py-2 text-sm ${
          travado
            ? "border-[var(--color-highlight-danger)] bg-[color-mix(in_srgb,var(--color-highlight-danger)_12%,transparent)] text-[var(--color-highlight-danger)]"
            : "border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-foreground)]"
        }`}
      >
        {mensagem}
      </p>

      <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
        {(Object.keys(ILHAS) as IlhaId[]).map((id) => (
          <span key={id}>
            {ILHAS[id].nome}: grau {grauPorIlha[id]}
          </span>
        ))}
      </div>
    </div>
  );
}
