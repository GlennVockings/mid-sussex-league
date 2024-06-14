"use client"

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { getColor } from "@/lib/utils";
import { useEffect, useState } from "react";
import { LeagueTabs } from "./LeagueTabs";
import { LeagueContent } from "./LeagueContent";
import { useAllLeagues } from "@/hooks/use-league";
import { LeagueSummaryType } from "@/lib/type";
import { Loading } from "../Loading";

export const LeagueSummary = () => {
  const [ activeLeague, setActiveLeague ] = useState<LeagueSummaryType>({ _id: "", league: ""});
  const { data, isLoading } = useAllLeagues();

  useEffect(() => {
  if (!isLoading && data) {
    setActiveLeague(data[0]);
  }
}, [data, isLoading])

  if (isLoading) {
    return <Loading />
  }

  if (data === undefined) {
    return <div>No Information</div>
  }

  return (
    <section className={getColor(activeLeague?.league ?? "")}>
      <MaxWidthWrapper>
        <LeagueTabs setActiveLeague={setActiveLeague} data={data} activeLeague={activeLeague} />
        <LeagueContent league={activeLeague} />
      </MaxWidthWrapper>
    </section>
  )
}