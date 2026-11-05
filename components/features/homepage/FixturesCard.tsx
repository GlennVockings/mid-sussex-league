import { ArrowRight, CalendarDays } from "lucide-react";

import { BentoCard } from "@/components/ui/BentoCard";

import type { FixtureGroup } from "@/types/homepage";

type FixturesCardProps = {
  fixtures: FixtureGroup;
};

export function FixturesCard({ fixtures }: FixturesCardProps) {
  return (
    <BentoCard className="md:col-span-7">
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-msfl-blue">
              <CalendarDays size={14} />
              This weekend
            </div>

            <h2 className="text-2xl font-black tracking-[-0.04em]">
              {fixtures.label}
            </h2>
          </div>

          <button
            type="button"
            className="hidden cursor-pointer items-center gap-2 text-sm font-bold text-muted hover:text-ink sm:flex"
          >
            All fixtures
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 divide-y divide-border">
          {fixtures.matches.map((match) => (
            <div
              key={match.id}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-4"
            >
              <div className="flex min-w-0 items-center justify-end gap-2.5 text-right">
                <span className="truncate text-sm font-bold sm:text-base">
                  {match.homeTeam.name}
                </span>

                <div
                  className="size-7 shrink-0 rounded-full"
                  style={{
                    backgroundColor: match.homeTeam.primaryColour,
                  }}
                />
              </div>

              <div className="min-w-16 text-center">
                <div className="text-sm font-black">15:00</div>

                <div
                  className="mt-1 text-[9px] font-black uppercase tracking-wider"
                  style={{
                    color: match.competition.accent,
                  }}
                >
                  {match.competition.shortName}
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className="size-7 shrink-0 rounded-full"
                  style={{
                    backgroundColor: match.awayTeam.primaryColour,
                  }}
                />

                <span className="truncate text-sm font-bold sm:text-base">
                  {match.awayTeam.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
