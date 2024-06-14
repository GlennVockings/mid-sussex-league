import { FixtureType } from "@/lib/type"
import { TeamName } from "../TeamName"
import { cn, convertDate, getColor } from "@/lib/utils"

export const FixturesCard = ({fixture, league}: {fixture: FixtureType, league: string}) => {

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


  return (
    <div className="flex flex-col gap-2 bg-white py-2 px-2 md:px-1">
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
    </div>
  )
}