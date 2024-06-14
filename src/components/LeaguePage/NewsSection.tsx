"use client"

import { Button } from "../ui/button";
import { fakeNews } from "../../../dummyData";
import { useState } from "react";
import { NewsFilters, cn, getColor } from "@/lib/utils";
import { TeamType } from "@/lib/type";
import { NewsCardList } from "../NewsCardList";

export const NewsSection = ({ league, teams } : { league: string, teams: TeamType[] }) => {
  const [ shownNews, setShownNews ] = useState(6);

  const { leagueNews } = NewsFilters(fakeNews, teams);

  const loadMore = () => {
    let newNews;
    newNews = 10;

    setShownNews(prevState => prevState + newNews)
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 xl:gap-3">
        {
          leagueNews.map((news, index) => {
            if (index < shownNews )
            return (
              <NewsCardList key={news.id} {...news} />
            )
          })
        }
      </div>
      <div className="pt-3 flex justify-center">
        <Button onClick={loadMore} className={cn(getColor(league, "accent"), getColor(league, "accent-text"))}>Load more</Button>
      </div>
    </div>
  )
}