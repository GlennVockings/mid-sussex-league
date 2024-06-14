"use client"

import { TeamType } from "@/lib/type"
import { replaceWithDash } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export const BadgeList = ({ teams, league, year } : { teams: TeamType[], league: string, year: string }) => {

  return (
    <div className="flex gap-3 justify-center py-4">
      {
        teams.map(team => {
          return (
            <Link key={team._id} href={`/${encodeURIComponent(league.toLowerCase())}/${year}/${encodeURIComponent(team.name.toLowerCase())}`} className="p-1 bg-white rounded-full">
              <Image src={`/assets/${replaceWithDash(team.name)}-icon.png`} width={48} height={48} alt={team.name} />
            </Link>
          )
        })
      }
    </div>
  )
}