import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-2 mb-4 text-3xl font-semibold tracking-tight" {...props} />
  ),
  h2: (props) => (
    <h2
      className="mt-10 mb-3 text-xl font-semibold tracking-tight text-[var(--color-foreground)]"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-6 mb-2 text-lg font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mb-4 leading-7 text-[var(--color-muted)]" {...props} />,
  ul: (props) => <ul className="mb-4 list-disc space-y-1.5 pl-6" {...props} />,
  ol: (props) => <ol className="mb-4 list-decimal space-y-1.5 pl-6" {...props} />,
  code: (props) => (
    <code
      className="rounded border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-4 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 font-mono text-sm leading-relaxed"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-[var(--color-foreground)]" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-5 rounded-r-lg border-l-2 border-[var(--color-primary)] bg-[var(--color-primary-soft)] py-2 pl-4 text-[var(--color-foreground)]"
      {...props}
    />
  ),
  table: (props) => (
    <div className="mb-4 overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-left font-medium text-[var(--color-foreground)]"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-[var(--color-border)] px-3 py-2 text-[var(--color-muted)]" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
