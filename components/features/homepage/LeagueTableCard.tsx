import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

import { BentoCard } from "@/components/ui/BentoCard";

import type { Competition, Standing } from "@/types/homepage";

type LeagueTableCardProps = {
  competition: Competition;
  standings: Standing[];
};

export function LeagueTableCard({
  competition,
  standings,
}: LeagueTableCardProps) {
  return (
    <BentoCard className="md:col-span-5">
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <div
              className="mb-2 text-xs font-black uppercase tracking-[0.16em]"
              style={{
                color: competition.accent,
              }}
            >
              {competition.name}
            </div>

            <h2 className="text-2xl font-black tracking-[-0.04em]">
              League table
            </h2>
          </div>

          <button
            type="button"
            aria-label="View full table"
            className="grid size-10 cursor-pointer place-items-center rounded-full bg-surface-muted text-muted transition hover:text-ink"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-[24px_minmax(0,1fr)_28px_36px] gap-2 border-b border-border pb-2 text-[10px] font-black uppercase tracking-wider text-muted">
            <span>#</span>
            <span>Club</span>
            <span className="text-center">P</span>
            <span className="text-right">PTS</span>
          </div>

          {standings.map((standing) => (
            <div
              key={standing.team.id}
              className="grid grid-cols-[24px_minmax(0,1fr)_28px_36px] items-center gap-2 border-b border-border/70 py-3 last:border-none"
            >
              <div className="flex items-center gap-0.5 text-xs font-bold text-muted">
                {standing.position}

                {standing.movement === "up" && (
                  <ArrowUp size={9} className="text-emerald-600" />
                )}

                {standing.movement === "down" && (
                  <ArrowDown size={9} className="text-red-500" />
                )}
              </div>

              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className="size-6 shrink-0 rounded-full"
                  style={{
                    backgroundColor: standing.team.primaryColour,
                  }}
                />

                <span className="truncate text-sm font-bold">
                  {standing.team.name}
                </span>
              </div>

              <span className="text-center text-sm text-muted">
                {standing.played}
              </span>

              <span className="text-right text-sm font-black">
                {standing.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
