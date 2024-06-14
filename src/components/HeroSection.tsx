"use client"

import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { fakeNews } from "../../dummyData"
import { NewsCardFeatured } from "./NewsCardFeatured"
import { NewsCardList } from "./NewsCardList"
import { Button } from "./ui/button"
import { NewsFilters } from "@/lib/utils"
import { useState } from "react"

export const HeroSection = () => {
  const [ activeNews, setActiveNews ] = useState<number>(6);
  const { featuredNews, filteredNews } = NewsFilters(fakeNews);

  return (
    <section className="bg-[#01257d] pt-2 pb-4">
      <MaxWidthWrapper>
        <div className="grid grid-cols-3 grid-rows-4 gap-4">
          {
            featuredNews.map((news, index) => {
              if ( index === 0 ) {
                return <NewsCardFeatured key={news.id} {...news} />
              } else if (index < 5 ) {
                return (
                  <NewsCardList key={news.id} {...news} />
                )
              }
            })
          }
        </div>
        <div className="py-4">
          <div className="grid grid-cols-3 py-4 gap-4">
            {
              filteredNews.map((news, index) => {
                if (index < activeNews)
                  return (
                <NewsCardList key={news.id} {...news} />
                )
              })
            }
          </div>
          <div className="flex justify-center">
            <Button className="bg-[#fff] text-[#01257d] hover:bg-[#00ffff] hover:text-[#01257d]" onClick={() => setActiveNews(prevState => prevState + 6)}>Load more</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}