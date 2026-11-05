import { ArrowUpRight, Sparkles } from "lucide-react";

import { BentoCard } from "@/components/ui/BentoCard";

import type { HomepageData } from "@/types/homepage";

type DiscoverCardProps = {
  data: HomepageData["trendingCompetition"];
};

export function DiscoverCard({ data }: DiscoverCardProps) {
  return (
    <BentoCard className="md:col-span-4">
      <div className="flex min-h-[270px] flex-col p-6">
        <div className="flex items-start justify-between">
          <div className="grid size-11 place-items-center rounded-2xl bg-msfl-pale text-msfl-navy">
            <Sparkles size={20} />
          </div>

          <ArrowUpRight size={20} className="text-muted" />
        </div>

        <div className="mt-auto">
          <div className="text-xs font-black uppercase tracking-[0.16em] text-muted">
            Rising now
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">
            {data.competition.name}
          </h2>

          <p className="mt-2 text-sm font-medium text-muted">{data.reason}</p>

          <div className="mt-5 flex items-end justify-between">
            <span className="text-3xl font-black tracking-[-0.04em]">
              {data.views.toLocaleString("en-GB")}
            </span>

            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              views
            </span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
