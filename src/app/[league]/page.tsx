"use client"

import { LeaguePage } from "@/components/LeaguePage/LeaguePage";
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
      <LeaguePage data={data} />
    </div>
  )
}