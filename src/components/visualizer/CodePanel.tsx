"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CodeLanguage } from "@/lib/code/languages";
import { LANGUAGE_META, LANGUAGE_ORDER } from "@/lib/code/languages";
import type { LanguageSource } from "@/lib/code/bubbleSort.code";
import { tokenizeLine } from "@/lib/code/highlight";

const TOKEN_CLASS: Record<string, string> = {
  keyword: "text-[var(--color-primary)] font-semibold",
  string: "text-[var(--color-highlight-success)]",
  comment: "text-[var(--color-muted)] italic",
  number: "text-[var(--color-highlight-compare)]",
  plain: "",
};

function LanguageBadge({ lang, size = "sm" }: { lang: CodeLanguage; size?: "sm" | "md" }) {
  const meta = LANGUAGE_META[lang];
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-md font-mono font-bold ${
        size === "sm" ? "h-5 min-w-5 px-1 text-[10px]" : "h-6 min-w-6 px-1.5 text-xs"
      }`}
      style={{ backgroundColor: meta.bg, color: meta.fg }}
    >
      {meta.badge}
    </span>
  );
}

function LanguageSelect({
  language,
  onLanguageChange,
}: {
  language: CodeLanguage;
  onLanguageChange: (lang: CodeLanguage) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-sm transition-colors hover:bg-[var(--color-surface-muted)]"
        aria-label="Escolher linguagem do código"
        aria-expanded={open}
      >
        <LanguageBadge lang={language} />
        <span>{LANGUAGE_META[language].label}</span>
        <span aria-hidden className="text-[var(--color-muted)]">
          ▾
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
          {LANGUAGE_ORDER.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                onLanguageChange(lang);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-surface-muted)] ${
                lang === language ? "text-[var(--color-primary)]" : ""
              }`}
            >
              <LanguageBadge lang={lang} />
              <span>{LANGUAGE_META[lang].label}</span>
              {lang === language && <span className="ml-auto text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
    <div className="glass-panel flex min-w-0 flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">Código</span>
        <LanguageSelect language={language} onLanguageChange={onLanguageChange} />
      </div>
      <div className="min-w-0 overflow-y-auto p-3 font-mono text-[12.5px] leading-6 sm:text-[13px]">
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
              <span className="min-w-0 whitespace-pre-wrap break-words text-[var(--color-foreground)]">
                {tokenizeLine(line, language).map((token, ti) => (
                  <span key={ti} className={TOKEN_CLASS[token.type]}>
                    {token.text}
                  </span>
                ))}
                {line === "" && " "}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
