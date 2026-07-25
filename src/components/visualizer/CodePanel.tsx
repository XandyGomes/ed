"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CodeLanguage, LanguageSource } from "@/lib/code/bubbleSort.code";
import { LANGUAGE_LABEL } from "@/lib/code/bubbleSort.code";
import { tokenizeLine } from "@/lib/code/highlight";

const TOKEN_CLASS: Record<string, string> = {
  keyword: "text-[var(--color-primary)] font-semibold",
  string: "text-[var(--color-highlight-success)]",
  comment: "text-[var(--color-muted)] italic",
  number: "text-[var(--color-highlight-compare)]",
  plain: "",
};

type Props = {
  language: CodeLanguage;
  onLanguageChange: (lang: CodeLanguage) => void;
  source: LanguageSource;
  stepKind?: string;
};

export function CodePanel({ language, onLanguageChange, source, stepKind }: Props) {
  const lines = useMemo(() => source.code.split("\n"), [source]);
  const highlightedLine = stepKind ? source.lineFor[stepKind] : undefined;
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeLineRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [highlightedLine]);

  return (
    <div className="glass-panel flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">Código</span>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as CodeLanguage)}
          className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-sm"
          aria-label="Linguagem do código"
        >
          {(Object.keys(LANGUAGE_LABEL) as CodeLanguage[]).map((lang) => (
            <option key={lang} value={lang}>
              {LANGUAGE_LABEL[lang]}
            </option>
          ))}
        </select>
      </div>
      <div className="max-h-80 overflow-y-auto p-3 font-mono text-[13px] leading-6 lg:max-h-none lg:flex-1">
        {lines.map((line, i) => {
          const lineNumber = i + 1;
          const isActive = lineNumber === highlightedLine;
          return (
            <div
              key={i}
              ref={isActive ? activeLineRef : undefined}
              className={`flex gap-3 rounded px-2 transition-colors duration-200 ${
                isActive ? "bg-[color-mix(in_srgb,var(--color-primary)_16%,transparent)]" : ""
              }`}
            >
              <span className="w-5 shrink-0 select-none text-right text-[var(--color-muted)]">{lineNumber}</span>
              <span className="whitespace-pre text-[var(--color-foreground)]">
                {tokenizeLine(line, language).map((token, ti) => (
                  <span key={ti} className={TOKEN_CLASS[token.type]}>
                    {token.text}
                  </span>
                ))}
                {line === "" && " "}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
