"use client"

import { LeagueContent } from "@/components/LeagueContent/LeagueContent";
import { Loading } from "@/components/Loading";
import { useLeagueByName } from "@/hooks/use-league";

export default function League({ params } : { params: { league: string, year: string }}) {
  const { data, isLoading } = useLeagueByName(params.league);

  if (isLoading) {
    return <Loading />
  }

  if (data === undefined) {
    return <div>No Information</div>
  }

  return (
    <div>
      <LeagueContent data={data} />
    </div>
  )
}