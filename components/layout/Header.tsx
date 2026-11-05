"use client";

import Link from "next/link";

import { Menu } from "@base-ui/react/menu";

import { ChevronDown, Menu as MenuIcon, Search, UserRound } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1500px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-msfl-navy text-sm font-black tracking-tight text-white transition-transform group-hover:scale-[1.03]">
            MS
          </div>

          <div className="hidden sm:block">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
              Mid Sussex
            </div>

            <div className="text-[15px] font-black leading-none text-msfl-navy">
              FOOTBALL
            </div>
          </div>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          <NavLink href="/fixtures">Fixtures</NavLink>

          <NavLink href="/results">Results</NavLink>

          <NavLink href="/clubs">Clubs</NavLink>

          <NavLink href="/competitions">Competitions</NavLink>

          <NavLink href="/watch">Watch</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="grid size-10 cursor-pointer place-items-center rounded-full text-muted transition hover:bg-surface-muted hover:text-ink"
          >
            <Search size={19} />
          </button>

          <Menu.Root>
            <Menu.Trigger className="hidden h-10 cursor-pointer items-center gap-2 rounded-full border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:bg-surface-muted sm:flex">
              <UserRound size={17} />

              <span>My football</span>

              <ChevronDown size={14} />
            </Menu.Trigger>

            <Menu.Portal>
              <Menu.Positioner
                sideOffset={8}
                align="end"
                className="base-ui-popup"
              >
                <Menu.Popup className="w-60 origin-top-right rounded-2xl border border-border bg-white p-2 shadow-xl outline-none">
                  <div className="px-3 pb-2 pt-2">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                      Coming later
                    </div>
                  </div>

                  <Menu.Item className="cursor-default rounded-xl px-3 py-2.5 text-sm font-medium outline-none data-[highlighted]:bg-surface-muted">
                    Follow your favourite clubs
                  </Menu.Item>

                  <Menu.Item className="cursor-default rounded-xl px-3 py-2.5 text-sm font-medium outline-none data-[highlighted]:bg-surface-muted">
                    Follow competitions
                  </Menu.Item>

                  <Menu.Item className="cursor-default rounded-xl px-3 py-2.5 text-sm font-medium outline-none data-[highlighted]:bg-surface-muted">
                    Personalise your homepage
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <button
            type="button"
            aria-label="Open navigation"
            className="grid size-10 cursor-pointer place-items-center rounded-full lg:hidden"
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full px-3.5 py-2 text-sm font-semibold text-muted transition hover:bg-surface-muted hover:text-ink"
    >
      {children}
    </Link>
  );
}
