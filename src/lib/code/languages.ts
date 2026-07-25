export type CodeLanguage = "java" | "python" | "cpp" | "javascript";

export type LanguageMeta = {
  label: string;
  badge: string;
  bg: string;
  fg: string;
};

export const LANGUAGE_META: Record<CodeLanguage, LanguageMeta> = {
  java: { label: "Java", badge: "J", bg: "#f89820", fg: "#1a1206" },
  python: { label: "Python", badge: "Py", bg: "#3776ab", fg: "#ffffff" },
  cpp: { label: "C++", badge: "C++", bg: "#00599c", fg: "#ffffff" },
  javascript: { label: "JavaScript", badge: "JS", bg: "#f0db4f", fg: "#1a1206" },
};

export const LANGUAGE_ORDER: CodeLanguage[] = ["java", "python", "cpp", "javascript"];
