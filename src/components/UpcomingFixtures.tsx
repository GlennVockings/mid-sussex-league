"use client"

import { FixtureCarousel } from "./FixtureCarousel"
import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { useAllLeagues } from "@/hooks/use-league";
import { ChangeEvent, useEffect, useState } from "react";
import { useFixturesById } from "@/hooks/use-fixture";
import { LeagueSummaryType } from "@/lib/type";
import { Loading } from "./Loading";
import { getColor } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa";

export const UpcomingFixtures = () => {
  const [ activeLeague, setActiveLeague ] = useState<LeagueSummaryType>({ _id: "", league: ""});
  const { data: summaryData, isLoading: SummaryLoading } = useAllLeagues();

  useEffect(() => {
    if (!SummaryLoading && summaryData) {
      setActiveLeague(summaryData[0]);
    }
  }, [summaryData, SummaryLoading])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedLeagueId = selectedOption.value;
    const selectedLeagueName = selectedOption.dataset.league ? selectedOption.dataset.league : "Premier League";
    setActiveLeague({ _id: selectedLeagueId, league: selectedLeagueName });
  }

  const { data, isLoading } = useFixturesById(activeLeague._id);

  if (isLoading || SummaryLoading) {
    return <Loading />
  }

  if (data === undefined || summaryData === undefined) {
    return <div>No Information</div>
  }

  return (
    <section className={getColor(activeLeague?.league ?? "")}>
      <MaxWidthWrapper>
        <div className="py-4">
          <div className="flex justify-between">
            <p className="text-xl font-bold">{activeLeague.league}</p>
            
            <div className="inline-block relative w-40">
              <select className="block appearance-none w-full bg-primary border text-white py-2 px-3 rounded-md leading-tight focus:outline-none focus:bg-primary focus:border-gray-500" onChange={(e) => handleChange(e)}>
                {
                  summaryData?.map(summary => {
                    return <option key={summary._id} value={summary._id} data-league={summary.league} selected={activeLeague._id === summary._id ? true : false}>{summary.league}</option>
                  })
                }
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="text-white" />
              </div>
            </div>
          </div>
          <div className="w-[90%] mx-auto py-4">
            {
              data && (
                <FixtureCarousel data={data} />
              )
            }
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}