"use client";

import { useMemo, useState } from "react";
import { StructurePlayground } from "@/components/visualizer/StructurePlayground";
import { SparseMatrixRenderer } from "@/components/visualizer/renderers/SparseMatrixRenderer";
import {
  makeSparseMatrixState,
  gerarRepresentacaoEsparsa,
  reconstruirMatrizDensa,
  makeSparseMatrixStateFromGrid,
} from "@/lib/algorithms/sparseMatrix";
import { gridFromImage } from "@/lib/algorithms/imageMatrix";
import type { SparseMatrixState } from "@/lib/algorithms/sparseMatrix";
import type { Highlight, OperationDef } from "@/lib/types";

const operations: OperationDef<SparseMatrixState>[] = [
  {
    id: "gerar",
    label: "Gerar representação esparsa",
    run: (state) => gerarRepresentacaoEsparsa(state),
  },
  {
    id: "reconstruir",
    label: "Reconstruir matriz densa a partir da esparsa",
    run: (state) => reconstruirMatrizDensa(state),
  },
];

const legend = [
  { label: "verificando", color: "var(--color-highlight-compare)" },
  { label: "não-zero (na lista esparsa)", color: "var(--color-highlight-success)" },
];

const RESOLUCOES = [12, 18, 24] as const;

type ImageRendererProps = {
  state: SparseMatrixState;
  highlights?: Highlight[];
  pointers?: Record<string, string>;
};

function ImagePixelRenderer({ state, highlights, pointers }: ImageRendererProps) {
  return <SparseMatrixRenderer state={state} highlights={highlights} pointers={pointers} pixelMode />;
}

export default function MatrizEsparsaPlayground() {
  const initialState = useMemo(() => makeSparseMatrixState(), []);

  const [imgState, setImgState] = useState<SparseMatrixState | null>(null);
  const [imgKey, setImgKey] = useState(0);
  const [resolucao, setResolucao] = useState<number>(18);
  const [imgError, setImgError] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleFile(file: File) {
    setImgError(null);
    setCarregando(true);
    try {
      const grid = await gridFromImage(file, resolucao);
      setImgState(makeSparseMatrixStateFromGrid(grid));
      setImgKey((k) => k + 1);
    } catch {
      setImgError("Não deu para ler essa imagem. Tente um arquivo PNG ou JPG.");
    } finally {
      setCarregando(false);
    }
  }

  const stats = useMemo(() => {
    if (!imgState) return null;
    const total = imgState.rows * imgState.cols;
    const naoZero = imgState.cells.filter((c) => c.value !== 0).length;
    return { total, naoZero, pct: Math.round((naoZero / total) * 100) };
  }, [imgState]);

  return (
    <div className="flex flex-col gap-10">
      <StructurePlayground
        initialState={initialState}
        operations={operations}
        Renderer={SparseMatrixRenderer}
        legend={legend}
      />

      <div className="glass-panel rounded-2xl p-4">
        <h3 className="mb-1 text-sm font-semibold">Exemplo real: comprima uma imagem</h3>
        <p className="mb-3 text-xs text-[var(--color-muted)]">
          Envie uma imagem simples (um logotipo com fundo sólido funciona bem) para ver, em escala
          de cinza, quantas células viram zero. O processamento acontece só no seu navegador, a
          imagem não é enviada para nenhum servidor.
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="text-sm"
          />
          <label className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            Resolução
            <select
              value={resolucao}
              onChange={(e) => setResolucao(Number(e.target.value))}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1"
            >
              {RESOLUCOES.map((r) => (
                <option key={r} value={r}>
                  {r} colunas
                </option>
              ))}
            </select>
          </label>
        </div>

        {carregando && <p className="mb-3 text-xs text-[var(--color-muted)]">Processando imagem...</p>}
        {imgError && <p className="mb-3 text-xs text-[var(--color-highlight-danger)]">{imgError}</p>}

        {stats && (
          <p className="mb-4 text-sm">
            De <strong>{stats.total}</strong> células, <strong>{stats.naoZero}</strong> não são zero
            ({stats.pct}% preenchida). A representação esparsa guarda só {stats.naoZero} triplas em
            vez de {stats.total} números.
          </p>
        )}

        {imgState && (
          <StructurePlayground
            key={imgKey}
            initialState={imgState}
            operations={operations}
            Renderer={ImagePixelRenderer}
            legend={legend}
          />
        )}
      </div>
    </div>
  );
}
