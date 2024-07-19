"use client"

import { useState } from "react";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { TbFilter, TbFilterFilled } from "react-icons/tb";
import { FixtureType, TeamType } from "@/lib/type";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { FixturesCard } from "./FixturesCard";

export const FixtureSection = ({ fixtures, teams, league } : { fixtures: FixtureType[], teams: TeamType[], league: string }) => {
  const [ teamfilter, setTeamFilter ] = useState<string>("");
  const [ monthfilter, setMonthFilter ] = useState<string>("");

  
  return (
    <>
      <div className="px-2 py-4 flex gap-2">
        <Drawer>
          <DrawerTrigger>
            <button className="flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1">
              {
                teamfilter ? <TbFilterFilled /> : <TbFilter />
              }
              Filter
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <div>
                <Select onValueChange={(e) => setTeamFilter(e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter via team" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      teams.map(team =>
                        <SelectItem key={ team._id} value={team.name}>{ team.name }</SelectItem>
                      )
                    }
                  </SelectContent>
                </Select>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <div className="flex">
          {
            teamfilter && (
              <div className="flex gap-2 items-center text-sm bg-gray-200 py-1 px-2 rounded-full">
                { teamfilter }
                <button className="p-1" onClick={() => setTeamFilter("")}>
                  x
                </button>
              </div>
            )
          }
        </div>
      </div>
      <div>
        {
          fixtures.map((fixture: FixtureType) => {
            if (teamfilter === fixture.home || teamfilter === fixture.away || teamfilter === "")
            return (
              <FixturesCard key={fixture._id} fixture={fixture} league={league} />
            )
          })
        }
      </div>
    </>
  )
}