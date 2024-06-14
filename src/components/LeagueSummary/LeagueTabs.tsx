import { LeagueSummaryType } from "@/lib/type";
import { cn, getColor } from "@/lib/utils";

export const LeagueTabs = ({ setActiveLeague, data, activeLeague } : { setActiveLeague: Function, data: LeagueSummaryType[], activeLeague: LeagueSummaryType }) => {
  
  return (
    <div className="flex justify-center py-4">
      <div className="bg-white flex gap-2 rounded-xl border-4 border-white">
        {
          data?.map((league, index) => {
            return (
              <div 
                key={league._id} 
                className={cn("px-4 py-2 rounded-xl font-semibold text-sm md:text-base", activeLeague._id === league._id ? cn(getColor(league.league, "accent"), getColor(league.league, "accent-text")) : "cursor-pointer")} 
                onClick={() => setActiveLeague(league)}
              >
                { league.league }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}