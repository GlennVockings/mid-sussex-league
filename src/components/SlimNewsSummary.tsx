"use client"

import { useState } from "react"
import { fakeNews } from "../../dummyData"
import Image from "next/image"
import { Badge } from "./ui/badge"
import { cn, getColor } from "@/lib/utils"
import { TeamSummaryType } from "@/lib/type"

export const SlimNewsSummary = ({ teams, league } : { teams: TeamSummaryType[], league: string }) => {
  const [ activeNewsItem, setActiveNewsItem ] = useState(0)

  const filteredNews = fakeNews.filter(news =>
    teams.some(team => news.tag.includes(team.name))
  );

  return (
    <div className="bg-white col-span-3 rounded-lg flex flex-col lg:flex-row lg:items-center h-full">
      <div className="flex-grow w-full">
        <div className="relative max-h-98">
            <div className="relative w-full h-56 sm:h-72 lg:h-98 overflow-hidden">
              <Image src={filteredNews[activeNewsItem].image} className="lg:rounded-l-lg object-cover" alt={filteredNews[activeNewsItem].title} fill={true} />
            </div>
          <div className="absolute bottom-0 w-full px-4 pt-8 pb-4 flex flex-col gap-2 lg:rounded-bl-lg text-white bg-gradient-to-t from-black from-30% via-black/40 via-75% to-transparent">
            <p className="font-semibold text-base lg:text-4xl">{filteredNews[activeNewsItem].title}</p>
            <p className="text-sm lg:text-base">{filteredNews[activeNewsItem].summary}</p>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className={cn(getColor(filteredNews[activeNewsItem].tag, "background"), getColor(filteredNews[activeNewsItem].tag, "text"))}>{filteredNews[activeNewsItem].tag}</Badge>
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll max-h-56 flex flex-col md:max-h-72 lg:rounded-r-lg lg:max-h-98">
        {
          filteredNews.map((news, index) => {
            if (index < 12) 
            return (
              <div key={news.id} className={cn("py-4 px-1 border cursor-pointer flex items-center gap-2", getColor(league, "accent-hover"), index === activeNewsItem ? `${getColor(league, "accent")} ${getColor(league, "accent-text")}` : "")} onClick={() => setActiveNewsItem(index)}>
                <Image src={news.image} alt={news.title} width={75} height={42} />
                <div>
                  <div className="flex">
                    <p className={cn("text-xs px-3 rounded-full", getColor(news.tag, "background"), getColor(news.tag, "text"))}>{news.tag}</p>
                  </div>
                  <p className="font-semibold text-base lg:text-lg">{ news.title }</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}