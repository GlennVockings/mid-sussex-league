import { ArrowUpRight, Flame, MapPin, Play } from "lucide-react";

import { BentoCard } from "../../ui/BentoCard";

import type { Match } from "@/types/homepage";

type HeroMatchCardProps = {
  match: Match;
};

export function HeroMatchCard({ match }: HeroMatchCardProps) {
  return (
    <BentoCard className="group min-h-[430px] md:col-span-8 md:row-span-2 lg:min-h-[520px]">
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{
          background: `linear-gradient(90deg, ${match.homeTeam.primaryColour}, ${match.awayTeam.primaryColour})`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(23,54,109,0.13),transparent_45%)]" />

      <div className="relative flex h-full min-h-[430px] flex-col p-6 sm:p-8 lg:min-h-[520px] lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0EE] px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-[#C43F38]">
              <Flame size={13} />
              Trending #1
            </span>

            <span
              className="rounded-full px-3 py-1.5 text-xs font-bold"
              style={{
                color: match.competition.accent,
                backgroundColor: `${match.competition.accent}15`,
              }}
            >
              {match.competition.name}
            </span>
          </div>

          <ArrowUpRight
            className="text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            size={22}
          />
        </div>

        <div className="mt-auto">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-muted">
            <MapPin size={16} />

            {match.venue}
          </div>

          <h1 className="max-w-[760px] text-[clamp(2.1rem,5vw,5rem)] font-black leading-[0.92] tracking-[-0.055em] text-ink">
            Seven-goal thriller lights up the weekend
          </h1>

          <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-y border-border py-6 sm:gap-8">
            <Team team={match.homeTeam} align="left" />

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                {match.homeScore}
              </span>

              <span className="text-xl font-medium text-muted">–</span>

              <span className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
                {match.awayScore}
              </span>
            </div>

            <Team team={match.awayTeam} align="right" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-msfl-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-msfl-blue">
              <Play fill="currentColor" size={15} />
              Watch highlights
            </button>

            <span className="text-sm font-semibold text-muted">
              {match.views?.toLocaleString("en-GB")} views
            </span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

function Team({
  team,
  align,
}: {
  team: Match["homeTeam"];
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-3 ${
        align === "right" ? "justify-end text-right" : ""
      }`}
    >
      {align === "right" && (
        <span className="hidden truncate text-lg font-black sm:block">
          {team.name}
        </span>
      )}

      <div
        className="grid size-11 shrink-0 place-items-center rounded-full text-xs font-black text-white sm:size-14"
        style={{
          backgroundColor: team.primaryColour,
        }}
      >
        {team.shortName}
      </div>

      {align === "left" && (
        <span className="hidden truncate text-lg font-black sm:block">
          {team.name}
        </span>
      )}
    </div>
  );
}
