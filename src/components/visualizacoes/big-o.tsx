"use client";

import { useMemo, useState } from "react";

const N_MAX = 30;
const WIDTH = 560;
const HEIGHT = 280;
const PADDING = 32;

const CURVES = [
  { id: "o1", label: "O(1)", color: "#22c55e", fn: () => 1 },
  { id: "olog", label: "O(log n)", color: "#3b82f6", fn: (n: number) => Math.log2(Math.max(n, 1)) },
  { id: "on", label: "O(n)", color: "#f59e0b", fn: (n: number) => n },
  { id: "onlogn", label: "O(n log n)", color: "#a855f7", fn: (n: number) => n * Math.log2(Math.max(n, 1)) },
  { id: "on2", label: "O(n²)", color: "#ef4444", fn: (n: number) => n * n },
];

const Y_MAX = N_MAX * N_MAX;

function toX(n: number) {
  return PADDING + ((n - 1) / (N_MAX - 1)) * (WIDTH - PADDING * 2);
}
function toY(value: number) {
  const clamped = Math.min(value, Y_MAX);
  return HEIGHT - PADDING - (clamped / Y_MAX) * (HEIGHT - PADDING * 2);
}

export default function BigOPlayground() {
  const [n, setN] = useState(10);

  const paths = useMemo(
    () =>
      CURVES.map((curve) => {
        const points = Array.from({ length: N_MAX }, (_, i) => {
          const x = i + 1;
          return `${toX(x)},${toY(curve.fn(x))}`;
        }).join(" ");
        return { ...curve, points };
      }),
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
          <line
            x1={PADDING}
            y1={HEIGHT - PADDING}
            x2={WIDTH - PADDING}
            y2={HEIGHT - PADDING}
            stroke="var(--color-border)"
          />
          <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="var(--color-border)" />
          <text x={WIDTH - PADDING} y={HEIGHT - PADDING + 18} fontSize="11" textAnchor="end" fill="var(--color-muted)">
            n →
          </text>
          <text x={PADDING - 6} y={PADDING} fontSize="11" textAnchor="end" fill="var(--color-muted)">
            operações
          </text>

          {paths.map((p) => (
            <polyline
              key={p.id}
              points={p.points}
              fill="none"
              stroke={p.color}
              strokeWidth={2}
            />
          ))}

          <line x1={toX(n)} y1={PADDING} x2={toX(n)} y2={HEIGHT - PADDING} stroke="var(--color-muted)" strokeDasharray="4 4" />
          {paths.map((p) => (
            <circle key={p.id} cx={toX(n)} cy={toY(p.fn(n))} r={4} fill={p.color} />
          ))}
        </svg>

        <div className="mt-2 flex flex-wrap gap-3 text-xs">
          {paths.map((p) => (
            <span key={p.id} className="flex items-center gap-1.5" style={{ color: p.color }}>
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
              {p.label}: {Math.round(p.fn(n)).toLocaleString("pt-BR")} operações
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <label htmlFor="n-slider" className="mb-2 block text-sm font-medium">
          Tamanho da entrada: n = {n}
        </label>
        <input
          id="n-slider"
          type="range"
          min={1}
          max={N_MAX}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
        />
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Arraste o controle e observe como o número de operações cresce de forma muito
          diferente para cada complexidade, mesmo com o mesmo n.
        </p>
      </div>
    </div>
  );
}
