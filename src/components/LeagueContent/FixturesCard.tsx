"use client"

import { FixtureType } from "@/lib/type"
import { TeamName } from "../TeamName"
import { cn, convertDate, getColor } from "@/lib/utils"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useState } from "react";
import { FixtureEvent } from "./FixtureEvent";

export const FixturesCard = ({fixture, league}: {fixture: FixtureType, league: string}) => {
  const [ openEvents, setOpenEvents ] = useState<boolean>(false);

  function fixtureStatus(fixture: FixtureType) {
    switch (fixture.status) {
      case "completed":
        return (
          <div className="flex flex-col justify-center items-center md:flex-row md:gap-3">
            <div className="flex w-full justify-around md:justify-end">
              <TeamName teamName={fixture.home} className="md:flex-row-reverse md:justify-start" />
              <div className={cn("py-1 w-6 flex justify-center font-semibold tracking-wide md:hidden", getColor(league, "accent"), getColor(league, "accent-text"))}>{ fixture.score?.home }</div>
            </div>
            <div className={cn("hidden md:flex justify-center rounded-md divide-x", getColor(league, "accent"), getColor(league, "accent-text"))}>
              <div className="py-1 px-2 font-semibold">{ fixture.score?.home }</div>
              <div className="py-1 px-2 font-semibold">{ fixture.score?.away }</div>
            </div>
            <div className="flex justify-around w-full md:justify-start">
              <TeamName teamName={fixture.away} className="md:justify-start" />
              <div className={cn("py-1 w-6 flex justify-center font-semibold tracking-wide md:hidden", getColor(league, "accent"), getColor(league, "accent-text"))}>{ fixture.score?.away }</div>
            </div>
          </div>
        )
      case "home walkover":
        return (
          <div className="flex flex-col justify-center items-center md:flex-row md:gap-3">
            <div className="flex w-full justify-around md:justify-end">
              <TeamName teamName={fixture.home} className="md:flex-row-reverse md:justify-start" />
              <div className={cn("py-1 w-6 flex justify-center font-semibold tracking-wide md:hidden", getColor(league, "accent"), getColor(league, "accent-text"))}>{ fixture.score?.home }</div>
            </div>
            <div className={cn("hidden md:flex justify-center rounded-md divide-x", getColor(league, "accent"), getColor(league, "accent-text"))}>
              <div className="py-1 px-2 font-semibold">H</div>
              <div className="py-1 px-2 font-semibold">W</div>
            </div>
            <div className="flex justify-around w-full md:justify-start">
              <TeamName teamName={fixture.away} className="md:justify-start" />
              <div className={cn("py-1 w-6 flex justify-center font-semibold tracking-wide md:hidden", getColor(league, "accent"), getColor(league, "accent-text"))}>{ fixture.score?.away }</div>
            </div>
          </div>
        )
      case "away walkover":
        return (
          <div className="flex flex-col justify-center items-center md:flex-row md:gap-3">
            <div className="flex w-full justify-around md:justify-end">
              <TeamName teamName={fixture.home} className="md:flex-row-reverse md:justify-start" />
              <div className={cn("py-1 w-6 flex justify-center font-semibold tracking-wide md:hidden", getColor(league, "accent"), getColor(league, "accent-text"))}>{ fixture.score?.home }</div>
            </div>
            <div className={cn("hidden md:flex justify-center rounded-md divide-x", getColor(league, "accent"), getColor(league, "accent-text"))}>
              <div className="py-1 px-2 font-semibold">A</div>
              <div className="py-1 px-2 font-semibold">W</div>
            </div>
            <div className="flex justify-around w-full md:justify-start">
              <TeamName teamName={fixture.away} className="md:justify-start" />
              <div className={cn("py-1 w-6 flex justify-center font-semibold tracking-wide md:hidden", getColor(league, "accent"), getColor(league, "accent-text"))}>{ fixture.score?.away }</div>
            </div>
          </div>
        )
      case "postponed":
        return (
          <div className="flex flex-col justify-center items-center md:flex-row md:gap-3">
            <div className="flex w-full justify-around md:justify-end">
              <TeamName teamName={fixture.home} className="md:flex-row-reverse md:justify-start" />
              <div className={cn("py-1 w-6 flex justify-center font-semibold tracking-wide md:hidden", getColor(league, "accent"), getColor(league, "accent-text"))}>{ fixture.score?.home }</div>
            </div>
            <div className={cn("hidden md:flex justify-center rounded-md divide-x", getColor(league, "accent"), getColor(league, "accent-text"))}>
              <div className="py-1 px-2 font-semibold">P</div>
              <div className="py-1 px-2 font-semibold">P</div>
            </div>
            <div className="flex justify-around w-full md:justify-start">
              <TeamName teamName={fixture.away} className="md:justify-start" />
              <div className={cn("py-1 w-6 flex justify-center font-semibold tracking-wide md:hidden", getColor(league, "accent"), getColor(league, "accent-text"))}>{ fixture.score?.away }</div>
            </div>
          </div>
        )
      case "upcoming":
        return (
          <div className="flex flex-col flex-grow md:gap-3 md:flex-row">
            <TeamName teamName={fixture.home} className="py-1 pl-1 justify-start md:flex-row-reverse md:flex-grow" />
            <p className={cn("hidden rounded-md py-1 px-2 font-semibold md:block", getColor(league, "accent"), getColor(league, "accent-text"))}>{ convertDate(fixture.dateTime, "HH:mm" ) }</p>
            <TeamName teamName={fixture.away} className="py-1 pl-1 justify-start md:flex-grow" />
          </div>
        )
    }
  }

// bg-gradient-to-t from-blue-200 to-30% to-transparent
  return (
    <div className="flex flex-col gap-2 py-2 px-2 md:px-1">
      <div className="flex justify-start md:justify-center gap-2">
        <p className="hidden text-nowrap md:block">{ convertDate(fixture.dateTime, "ddd Do MMM") }</p> 
        <p className="hidden md:block">|</p>
        <p className="text-xs md:text-base">{fixture.venue}</p>
      </div>
      {
        fixtureStatus(fixture)
      }
      <div className="flex gap-2 text-sm md:hidden">
        <p className="text-nowrap">{ convertDate(fixture.dateTime, "ddd Do MMM") }</p>
        <p>{ convertDate(fixture.dateTime, "HH:mm" ) }</p>
      </div>
      <div>
        {
          fixture.status === "completed" ? (
            <div className="flex flex-col">
              <div className={cn("flex transition-all overflow-y-scroll", openEvents ? "h-40 py-2" : "h-0")}>
                <div className="flex flex-col gap-1 w-full">
                  {
                    fixture.events?.map(event => (
                      <FixtureEvent key={event.player} {...event} />
                    ))
                  }
                </div>
              </div>
              <button 
                className="w-full py-1 flex items-center gap-2 justify-center bg-blue-700 text-white"
                onClick={() => setOpenEvents(!openEvents)}
              >
                Show match events
                <FaChevronDown className={cn("transition-all", openEvents ? "rotate-180" : "")} /> 
              </button>
            </div>
          ) : (
            <div>
            </div>
          )
        }
      </div>
    </div>
  )
}