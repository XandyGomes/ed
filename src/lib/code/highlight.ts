import type { CodeLanguage } from "./bubbleSort.code";

const KEYWORDS: Record<CodeLanguage, string[]> = {
  java: ["public", "static", "void", "int", "boolean", "for", "if", "break", "true", "false", "new"],
  python: ["def", "for", "in", "range", "if", "not", "return", "True", "False", "break"],
  cpp: ["void", "int", "bool", "for", "if", "break", "true", "false", "vector"],
  javascript: ["function", "const", "let", "for", "if", "break", "return", "true", "false"],
};

const COMMENT_PREFIX: Record<CodeLanguage, string> = {
  java: "//",
  python: "#",
  cpp: "//",
  javascript: "//",
};

export type Token = { text: string; type: "keyword" | "comment" | "string" | "number" | "plain" };

export function tokenizeLine(line: string, lang: CodeLanguage): Token[] {
  const commentPrefix = COMMENT_PREFIX[lang];
  const commentIdx = line.indexOf(commentPrefix);

  const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : "";

  const keywords = KEYWORDS[lang];
  const pattern = new RegExp(`\\b(${keywords.join("|")})\\b|"[^"]*"|'[^']*'|\\b\\d+\\b`, "g");

  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(codePart))) {
    if (match.index > lastIndex) {
      tokens.push({ text: codePart.slice(lastIndex, match.index), type: "plain" });
    }
    const text = match[0];
    const type: Token["type"] = keywords.includes(text)
      ? "keyword"
      : /^["']/.test(text)
        ? "string"
        : "number";
    tokens.push({ text, type });
    lastIndex = match.index + text.length;
  }
  if (lastIndex < codePart.length) {
    tokens.push({ text: codePart.slice(lastIndex), type: "plain" });
  }
  if (commentPart) {
    tokens.push({ text: commentPart, type: "comment" });
  }
  return tokens;
}
