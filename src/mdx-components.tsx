import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => <h1 className="text-3xl font-bold mt-2 mb-4" {...props} />,
  h2: (props) => (
    <h2 className="text-2xl font-semibold mt-8 mb-3 text-[var(--color-foreground)]" {...props} />
  ),
  h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />,
  p: (props) => <p className="leading-7 mb-4 text-[var(--color-muted)]" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-[var(--color-surface-muted)] px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="rounded-lg bg-[var(--color-surface-muted)] p-4 overflow-x-auto mb-4 font-mono text-sm"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-[var(--color-foreground)]" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-muted)] mb-4"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
