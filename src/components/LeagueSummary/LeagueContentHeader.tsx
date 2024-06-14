import { TeamType } from "@/lib/type"
import { cn, getColor, replaceWithDash } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export const LeagueContentHeader = ({ title, teams, year} : {title: string, teams: TeamType[], year: string }) => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-0 md:justify-between md:flex-row">
      <div className="py-1 px-2 bg-white rounded-lg">
        <p className="text-xl font-bold">{ title }</p>
      </div>
      <div className="flex justify-center gap-3 flex-wrap md:flex-nowrap ">
        {
          teams.map(team => {
            return (
              <TooltipProvider key={team._id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link  href={`/${encodeURIComponent(title.toLowerCase())}/${year}/${encodeURIComponent(team.name.toLowerCase())}`} className="bg-white rounded-full p-1 h-8 w-8">
                      <Image src={`/assets/${replaceWithDash(team.name)}-icon.png`} width={24} height={24} alt={team.name} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className={cn(getColor(title, "accent"), getColor(title, "accent-text"))}>
                    <p>{ team.name }</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })
        }
      </div>
    </div>
  )
}