import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Mid Sussex
          </div>

          <div className="mt-1 text-xl font-black text-msfl-navy">FOOTBALL</div>

          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            A new way to discover grassroots football, follow local clubs and
            watch the moments that matter.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black">Explore</h2>

          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <Link href="/fixtures">Fixtures</Link>
            <Link href="/results">Results</Link>
            <Link href="/clubs">Clubs</Link>
            <Link href="/competitions">Competitions</Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black">The platform</h2>

          <p className="mt-4 text-sm leading-6 text-muted">
            Prototype edition. Fixtures, statistics and editorial content are
            currently illustrative.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] border-t border-border px-4 py-5 text-xs text-muted sm:px-6 lg:px-8">
        © 2026 Mid Sussex Football — Independent prototype.
      </div>
    </footer>
  );
}
