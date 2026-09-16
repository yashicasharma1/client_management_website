import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col justify-between py-10 pl-2 pr-6 sm:flex">
      <div>
        <Link href="/" className="block">
          <div className="text-lg font-semibold leading-tight text-ink">
            Client Hub
          </div>
          <div className="mt-1 font-mono text-xs text-inkfaint">
            brand &amp; media roster
          </div>
        </Link>

        <nav className="mt-10 flex flex-col gap-1 text-sm">
          <Link
            href="/"
            className="rounded-sm px-2 py-1.5 -ml-2 text-ink hover:bg-panel"
          >
            All clients
          </Link>
          <Link
            href="/clients/new"
            className="rounded-sm px-2 py-1.5 -ml-2 text-inkfaint hover:bg-panel hover:text-ink"
          >
            Add a client
          </Link>
        </nav>
      </div>

      <div className="font-mono text-[11px] leading-relaxed text-inkfaint">
        Handles, GA4, Clarity and
        <br />
        Search Console — one place
        <br />
        per client.
      </div>
    </aside>
  );
}
