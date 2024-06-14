import { useLeagueSummaryById } from "@/hooks/use-league"
import { StatsSection } from "../StatsSection"
import { SlimLeagueTable } from "../SlimLeagueTable";
import { Loading } from "../Loading";
import { LeagueContentHeader } from "./LeagueContentHeader";
import { SlimNewsSummary } from "../SlimNewsSummary";
import { SlimFixtures } from "../SlimFixtures";

export const LeagueContent = ({ league } : { league: { _id: string, league: string} }) => {

  const { data, isLoading } = useLeagueSummaryById(league._id);

  if (isLoading) {
    return <Loading />
  }

  if (data === undefined) {
    return <div>No Information</div>
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <LeagueContentHeader title={league.league} year={data.season} teams={data.teams} />
      <div className="grid grid-cols-1 gap-y-4 lg:gap-y-0 lg:grid-cols-4 lg:gap-3">
        <SlimLeagueTable data={data.table} league={league.league} />
        <SlimNewsSummary teams={data.teams} league={league.league} />
      </div>
      <div className="grid grid-cols-1 gap-y-4 lg:gap-y-0 lg:grid-cols-2 lg:gap-3 lg:max-h-146">
        <SlimFixtures upcoming={data.upcomingFixtures} completed={data.completedFixtures} league={league.league} />
        <StatsSection data={data.stats} league={league.league} />
      </div>
    </div>
  )
}