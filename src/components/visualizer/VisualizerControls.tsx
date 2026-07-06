"use client";

import type { UseVisualizerReturn } from "./useVisualizer";

type Props<TState> = {
  visualizer: UseVisualizerReturn<TState>;
};

export function VisualizerControls<TState>({ visualizer }: Props<TState>) {
  const {
    currentFrame,
    currentIndex,
    totalFrames,
    isPlaying,
    isAtStart,
    isAtEnd,
    speed,
    setSpeed,
    play,
    pause,
    stepForward,
    stepBack,
    reset,
    seek,
  } = visualizer;

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
      onKeyDown={(e) => {
        if (e.key === " ") {
          e.preventDefault();
          isPlaying ? pause() : play();
        } else if (e.key === "ArrowRight") {
          stepForward();
        } else if (e.key === "ArrowLeft") {
          stepBack();
        }
      }}
      tabIndex={0}
      role="group"
      aria-label="Controles da visualização"
    >
      <div
        className="min-h-[1.75rem] text-sm font-medium text-[var(--color-foreground)]"
        aria-live="polite"
      >
        {currentFrame?.narration ?? "Escolha uma operação para começar."}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={reset}
          disabled={isAtStart}
          className="rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-sm disabled:opacity-40 hover:bg-[var(--color-surface-muted)]"
          aria-label="Reiniciar"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={stepBack}
          disabled={isAtStart}
          className="rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-sm disabled:opacity-40 hover:bg-[var(--color-surface-muted)]"
          aria-label="Passo anterior"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={isPlaying ? pause : play}
          disabled={totalFrames === 0}
          className="rounded-md bg-[var(--color-primary)] px-4 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] disabled:opacity-40"
          aria-label={isPlaying ? "Pausar" : "Reproduzir"}
        >
          {isPlaying ? "⏸ Pausar" : "▶ Reproduzir"}
        </button>
        <button
          type="button"
          onClick={stepForward}
          disabled={isAtEnd}
          className="rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-sm disabled:opacity-40 hover:bg-[var(--color-surface-muted)]"
          aria-label="Próximo passo"
        >
          ▶|
        </button>

        <div className="ml-auto flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <label htmlFor="velocidade">Velocidade</label>
          <input
            id="velocidade"
            type="range"
            min={0.5}
            max={3}
            step={0.25}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24 accent-[var(--color-primary)]"
          />
          <span className="w-8 tabular-nums">{speed.toFixed(2)}x</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={Math.max(totalFrames - 1, 0)}
        value={currentIndex}
        onChange={(e) => seek(Number(e.target.value))}
        disabled={totalFrames === 0}
        className="w-full accent-[var(--color-primary)]"
        aria-label="Progresso da animação"
      />
      <div className="text-right text-xs text-[var(--color-muted)]">
        Passo {totalFrames === 0 ? 0 : currentIndex + 1} de {totalFrames}
      </div>
    </div>
  );
}
