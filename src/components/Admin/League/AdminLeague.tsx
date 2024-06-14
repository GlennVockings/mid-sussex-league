"use client"

import { LeagueType } from "@/lib/type"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { AdminSeason } from "./AdminSeason";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MaxWidthWrapper } from "../../MaxWidthWrapper";

export const AdminLeague = ({league} : {league: LeagueType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MaxWidthWrapper>
      <div className="border-4 py-2 px-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">{league.league}</p>
          <button onClick={() => setIsOpen((prevState) => !prevState)}>
            {
              isOpen ? <FaMinus /> : <FaPlus />
            }
          </button>
        </div>
        <div className={cn("flex flex-col gap-3 overflow-hidden transition-all", isOpen ? "h-auto" : "h-0")}>
          {
            league.seasons.map(season => {
              return (
                <AdminSeason key={season.season} season={season} />
              )
            })
          }
        </div>
      </div>
    </MaxWidthWrapper>
  )
}