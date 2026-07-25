"use client";

import { useEffect, useMemo, useState } from "react";
import { useVisualizer } from "@/components/visualizer/useVisualizer";
import { VisualizerControls } from "@/components/visualizer/VisualizerControls";
import { ArrayRenderer } from "@/components/visualizer/renderers/ArrayRenderer";
import { CodePanel } from "@/components/visualizer/CodePanel";
import { makeArrayState } from "@/lib/algorithms/common";
import { bubbleSort } from "@/lib/algorithms/bubbleSort";
import { BUBBLE_SORT_CODE } from "@/lib/code/bubbleSort.code";
import type { CodeLanguage } from "@/lib/code/languages";
import { playTone } from "@/lib/sound";
import type { FrameSequence, ArrayState } from "@/lib/types";

const PRESETS: Record<string, number[]> = {
  standard: [64, 34, 25, 12, 22, 11, 90],
  pequeno: [5, 2, 8],
  "invertido": [9, 8, 7, 6, 5, 4, 3],
  ordenado: [1, 2, 3, 4, 5, 6, 7],
  "quase-ordenado": [1, 2, 4, 3, 5, 6, 7],
  "tudo-igual": [5, 5, 5, 5, 5],
};

const PRESET_LABEL: Record<string, string> = {
  standard: "Padrão",
  pequeno: "Pequeno",
  invertido: "Invertido",
  ordenado: "Já ordenado",
  "quase-ordenado": "Quase ordenado",
  "tudo-igual": "Todos iguais",
};

export default function BubbleSortPlayground() {
  const [presetKey, setPresetKey] = useState("standard");
  const [language, setLanguage] = useState<CodeLanguage>("java");
  const [soundOn, setSoundOn] = useState(true);

  const frames: FrameSequence<ArrayState> = useMemo(() => {
    const initial = makeArrayState(PRESETS[presetKey]);
    const result = bubbleSort(initial);
    if (!result.ok) return [{ id: 0, state: initial, narration: result.error }];
    return result.frames;
  }, [presetKey]);

  const visualizer = useVisualizer(frames);

  useEffect(() => {
    const kind = visualizer.currentFrame?.stepKind;
    if (!soundOn) return;
    if (kind === "compare") playTone("compare");
    else if (kind === "swap") playTone("swap");
    else if (kind === "done") playTone("success");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualizer.currentIndex, soundOn]);

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-panel flex flex-wrap items-center gap-3 rounded-2xl p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">Entrada</span>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPresetKey(key)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                presetKey === key
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                  : "border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
              }`}
            >
              {PRESET_LABEL[key]}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSoundOn((v) => !v)}
          className="ml-auto rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[var(--color-surface-muted)]"
          aria-pressed={soundOn}
        >
          {soundOn ? "🔊 Som ligado" : "🔇 Som desligado"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <CodePanel
          language={language}
          onLanguageChange={setLanguage}
          source={BUBBLE_SORT_CODE[language]}
          stepKind={visualizer.currentFrame?.stepKind}
        />

        <div className="flex min-w-0 flex-col gap-4">
          <div className="glass-panel rounded-2xl">
            <ArrayRenderer
              state={visualizer.currentFrame?.state ?? { items: [] }}
              highlights={visualizer.currentFrame?.highlights}
              pointers={visualizer.currentFrame?.pointers}
            />
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--color-highlight-compare)" }} />
              comparando
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--color-highlight-new)" }} />
              trocando
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--color-highlight-success)" }} />
              posição final
            </span>
          </div>
          <VisualizerControls visualizer={visualizer} />
        </div>
      </div>
    </div>
  );
}
