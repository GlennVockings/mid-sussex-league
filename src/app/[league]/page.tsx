"use client"

import { FixtureSection } from "@/components/LeagueContent/FixtureSection";
import { StatsSection } from "@/components/LeagueContent/StatsSection";
import { LeagueTable } from "@/components/LeagueTable";
import { Loading } from "@/components/Loading";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeagueByName } from "@/hooks/use-league";
import { cn, getColor } from "@/lib/utils";
import { useState } from "react";

export default function League({ params } : { params: { league: string, year: string }}) {
  const [ hash, setHash ] = useState<string>(window.location.hash.substring(1) || "table");

  const [ seasonSelector, setSeasonSelector ] = useState<number>(0);
  const { data, isLoading } = useLeagueByName(params.league);

  function handleTabs(tab: string) {
    window.location.hash = tab;
    setHash(tab);
  }

  if (isLoading) {
    return <Loading />
  }

  if (data === undefined) {
    return <div>No Information</div>
  }

  return (
    <div>
      <section className={cn(`py-4`, getColor(data.league, "background"))}>
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <div className="py-8">
              <p className="text-xl md:text-3xl font-bold">{ data.league }</p>
            </div>

            <div>
              <Select onValueChange={(e) => setSeasonSelector(Number(e))} value={`${seasonSelector}`}>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {
                    data.seasons.map((season, index) => {
                      return <SelectItem key={season.season} value={`${index}`}>{season.season}</SelectItem>
                    })
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
        
          {/* TABS */}
          <div className="flex gap-2 overflow-x-scroll">
            <div>
              <button 
                className={cn(`py-2 px-4 min-w-28 rounded-t-lg tracking-wider`, hash === "table" ? "bg-blue-800 text-white font-bold" : "bg-white")}
                onClick={() => handleTabs("table")}
              >
                Table
              </button>
            </div>
            <div>
              <button 
                className={cn(`py-2 px-4 min-w-28 rounded-t-lg tracking-wider`, hash === "fixtures" ? "bg-blue-800 text-white font-bold" : "bg-white")} 
                onClick={() => handleTabs("fixtures")}
              >
                Fixtures
              </button>
            </div>
            <div>
              <button 
                className={cn(`py-2 px-4 min-w-28 rounded-t-lg tracking-wider`, hash === "news" ? "bg-blue-800 text-white font-bold" : "bg-white")} 
                onClick={() => handleTabs("news")}
              >
                News
              </button>
            </div>
            <div>
              <button 
                className={cn(`py-2 px-4 min-w-28 rounded-t-lg tracking-wider`, hash === "stats" ? "bg-blue-800 text-white font-bold" : "bg-white")} 
                onClick={() => handleTabs("stats")}
              >
                Stats
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white p-1 pt-4 md:p-4 rounded-b-lg">
            
            {/* Table */}
            <div className={cn(hash === "table" ? "block" : "hidden")}>
              <LeagueTable data={data.seasons[seasonSelector].table || []} />
            </div>
            
            {/* Fixtures */}
            <div className={cn(hash === "fixtures" ? "block" : "hidden")}>
              <FixtureSection 
                fixtures={data.seasons[seasonSelector].fixtures || []}
                teams={data.seasons[seasonSelector].teams || []}
                league={data.league} 
              />
            </div>

            {/* Stats */}
            <div className={cn(hash === "stats" ? "block" : "hidden")}>
              <StatsSection data={ data.seasons[seasonSelector].teams || [] } />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}