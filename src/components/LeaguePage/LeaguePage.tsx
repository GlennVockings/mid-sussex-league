import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FixtureType, LeagueType } from "@/lib/type";
import { LeagueTable } from "../LeagueTable";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { cn, getColor } from "@/lib/utils";
import { MonthCarousel } from "../MonthCarousel";
import { FixturesCard } from "./FixturesCard";
import { Separator } from "../ui/separator";
import { MaxWidthWrapper } from "../MaxWidthWrapper";
import { StatTable } from "../StatTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { NewsSection } from "./NewsSection";

interface sortedFixtures {
  date: string
  fixtures: FixtureType[]
}

export const LeaguePage = ({ data } : { data: LeagueType }) => {
  const [ seasonSelector, setSeasonSelector ] = useState(0);
  const [ isExpanded, setIsExpanded ] = useState(false)
  const [ activeMonth, setActiveMonth ] = useState("");

  const sortedFixtures = data.seasons[seasonSelector].fixtures
  .filter(fixture => fixture.status !== "")
  .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
  .reduce((acc, fixture) => {
    // Get the month and year of the fixture
    const date = new Date(fixture.dateTime);
    const monthYear = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)} ${date.getFullYear()}`;

    // Add the fixture to the corresponding month and year array
    const index = acc.findIndex(item => item.date === monthYear);
    if (index === -1) {
      acc.push({ date: monthYear, fixtures: [fixture] });
    } else {
      acc[index].fixtures.push(fixture);
    }

    acc.sort((a,b) => b.date - a.date)

    return acc;
  }, []);

  return (
    <>
      <section className={`${getColor(data.league, "background")}`}>
        <MaxWidthWrapper>
          <div className="flex justify-between py-4">
            <p className="text-xl font-bold">{ data.league }</p>
            <div>
              <Select onValueChange={(e) => setSeasonSelector(e)} value={`${seasonSelector}`}>
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
          <NewsSection teams={data.seasons[seasonSelector].teams} league={data.league} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 relative py-4">
            {/* LEFT COLUMN */}
            <div className="">
              {/* ROW 1 */}
              <div className="flex flex-col justify-start gap-3 p-2 bg-white rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="font-bold">League Table</p>
                  <button className="bg-gray-400 p-2 rounded-full" onClick={() => setIsExpanded(prevState => !prevState)}>
                    {
                      isExpanded ? <FaChevronLeft /> : <FaChevronRight />
                    }
                  </button>
                </div>
                <LeagueTable data={data.seasons[seasonSelector].table} expanded={isExpanded} />
              </div>
            </div>
            {/* MAIN COLUMN */} 
            <div className="lg:col-span-2">
              <div className="grid grid-col-1 gap-4">
                {/* ROW 1 */}
                <div className="rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-white py-4 flex justify-center">
                    <MonthCarousel data={sortedFixtures} league={data.league} setActiveMonth={setActiveMonth} />
                  </div>
                  <Separator />
                  <div className="h-80 lg:h-116 overflow-y-scroll">
                    {
                      sortedFixtures.map((month: sortedFixtures) => {
                        if (month.date === activeMonth) {
                          // Add the return statement here
                          return month.fixtures.map(fixture => {
                            return (
                              <FixturesCard key={fixture._id} fixture={fixture} league={data.league} />
                            )
                          })
                        } else {
                          return null; // Return null if the month is not active
                        }
                      })
                    }
                  </div>
                </div>
                {/* ROW 2 */}
                <Tabs defaultValue="team">
                  <TabsList className={cn("grid w-full grid-cols-2", getColor(data.league, "accent"), getColor(data.league, "accent-text"))}>
                    <TabsTrigger value="team">Team Stats</TabsTrigger>
                    <TabsTrigger value="player">Player Stats</TabsTrigger>
                  </TabsList>
                  <TabsContent value="team">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {
                        data.seasons[seasonSelector].stats?.map(stat => {
                          return <StatTable key={stat.name} title={stat.name} data={stat.stats} league={data.league} />;
                        })
                      }
                    </div>
                  </TabsContent>
                  <TabsContent value="player">

                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}