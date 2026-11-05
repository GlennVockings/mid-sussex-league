import type { HomepageData } from "@/types/homepage";

import { DiscoverCard } from "./DiscoverCard";
import { FixturesCard } from "./FixturesCard";
import { HeroMatchCard } from "./HeroMatchCard";
import { LeagueTableCard } from "./LeagueTableCard";
import { TrendingVideoCard } from "./TrendingVideoCard";

type HomepageGridProps = {
  data: HomepageData;
};

export function HomepageGrid({ data }: HomepageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
      <div className="md:col-span-8">
        <HeroMatchCard match={data.heroMatch} />
      </div>

      <div className="grid gap-4 md:col-span-4 md:gap-5">
        <TrendingVideoCard video={data.trendingVideo} />

        <DiscoverCard data={data.trendingCompetition} />
      </div>

      <div className="md:col-span-5">
        <LeagueTableCard
          competition={data.table.competition}
          standings={data.table.standings}
        />
      </div>

      <div className="md:col-span-7">
        <FixturesCard fixtures={data.fixtures} />
      </div>
    </div>
  );
}
