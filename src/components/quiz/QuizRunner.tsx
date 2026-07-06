"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import clsx from "clsx";

type Props = {
  questions: QuizQuestion[];
};

export function QuizRunner({ questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => {
      if (prev[questionId] !== undefined) return prev;
      return { ...prev, [questionId]: optionIndex };
    });
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((q) => answers[q.id] === q.correta).length;

  return (
    <div className="flex flex-col gap-6">
      {answeredCount === questions.length && questions.length > 0 && (
        <div className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-soft)] px-4 py-3 text-sm font-medium">
          Você acertou {correctCount} de {questions.length} questões.
        </div>
      )}

      {questions.map((q, qIndex) => {
        const answered = answers[q.id];
        return (
          <div key={q.id} className="glass-panel rounded-2xl p-4">
            <p className="mb-3 font-medium">
              {qIndex + 1}. {q.enunciado}
            </p>
            <div className="flex flex-col gap-2">
              {q.opcoes.map((opcao, i) => {
                const isSelected = answered === i;
                const isCorrectOption = i === q.correta;
                const showFeedback = answered !== undefined;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAnswer(q.id, i)}
                    disabled={showFeedback}
                    className={clsx(
                      "rounded-md border px-3 py-2 text-left text-sm transition-all",
                      !showFeedback &&
                        "border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] active:scale-[0.99]",
                      showFeedback && isCorrectOption && "border-[var(--color-highlight-success)] bg-[var(--color-highlight-success)]/10",
                      showFeedback && isSelected && !isCorrectOption && "border-[var(--color-highlight-danger)] bg-[var(--color-highlight-danger)]/10",
                      showFeedback && !isSelected && !isCorrectOption && "border-[var(--color-border)] opacity-50"
                    )}
                  >
                    {opcao}
                  </button>
                );
              })}
            </div>
            {answered !== undefined && (
              <p
                className={clsx(
                  "mt-3 text-sm",
                  answered === q.correta ? "text-[var(--color-highlight-success)]" : "text-[var(--color-highlight-danger)]"
                )}
              >
                {answered === q.correta ? "Correto! " : "Não foi dessa vez. "}
                {q.explicacao}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
