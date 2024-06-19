import { useLeagueByName } from "@/hooks/use-league"
import { StatsSection } from "../StatsSection"
import { SlimLeagueTable } from "../SlimLeagueTable";
import { LeagueContentHeader } from "./LeagueContentHeader";
import { SlimNewsSummary } from "../SlimNewsSummary";
import { SlimFixtures } from "../SlimFixtures";

export const LeagueContent = ({ activeLeague, setActiveLeague } : { activeLeague: string, setActiveLeague: Function }) => {
  const { data } = useLeagueByName(activeLeague);

  return (
    <div className="flex flex-col gap-4 py-4">
          <LeagueContentHeader title={data?.league || ""} year={data?.seasons[0].season || ""} teams={data?.seasons[0].teams || []} activeLeague={activeLeague} setActiveLeague={setActiveLeague} />
          <div className="grid grid-cols-1 gap-y-4 lg:gap-y-0 lg:grid-cols-4 lg:gap-3">
            <SlimLeagueTable data={data?.seasons[0].table || []} league={data?.league || ""} />
            <SlimNewsSummary teams={data?.seasons[0].teams || []} league={data?.league || ""} />
          </div>
          <div className="grid grid-cols-1 gap-y-4 lg:gap-y-0 lg:grid-cols-2 lg:gap-3 lg:max-h-146">
            <SlimFixtures upcoming={data?.seasons[0].upcomingFixtures || []} completed={data?.seasons[0].completedFixtures || []} league={data?.league || ""} />
            <StatsSection data={data?.seasons[0].stats || { team: [], player: [] }} league={data?.league || ""} />
          </div>
        </div>
  )
}