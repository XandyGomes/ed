import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
            ED
          </span>
          <span>Estrutura de Dados</span>
        </Link>
        <nav className="flex gap-4 text-sm text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-foreground)]">
            Tópicos
          </Link>
        </nav>
      </div>
    </header>
  );
}
