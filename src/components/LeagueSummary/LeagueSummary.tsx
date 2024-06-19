"use client"

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { getColor } from "@/lib/utils";
import { useState } from "react";
import { LeagueContent } from "./LeagueContent";

export const LeagueSummary = () => {
  const [ activeLeague, setActiveLeague ] = useState<string>('premier-league');

  return (
    <section className={getColor(activeLeague ?? "")}>
      <MaxWidthWrapper>
        <LeagueContent activeLeague={activeLeague} setActiveLeague={setActiveLeague}  />
      </MaxWidthWrapper>
    </section>
  )
} 