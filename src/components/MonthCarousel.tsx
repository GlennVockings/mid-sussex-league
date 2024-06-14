import { FixtureType } from "@/lib/type"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import { cn, convertDate, getColor } from "@/lib/utils"
import { Card, CardContent } from "./ui/card"

export const MonthCarousel = ({ data, setActiveMonth, league } : { data: [{ date: string, fixtures: FixtureType[] }], setActiveMonth: (date: string) => void, league: string }) => {
  const [api, setApi] = useState<CarouselApi>();
  const timeNow = new Date().toISOString();

  useEffect(() => {
    if (!api) {
      return
    }
 
    api.on("init", () => {
      setActiveMonth(data[api.selectedScrollSnap()].date)
    })
    api.on("select", () => {
      setActiveMonth(data[api.selectedScrollSnap()].date)
    })
  }, [api, data, setActiveMonth])

  const foundIndex = data.findIndex((month) => {
    const monthNow = convertDate(timeNow, "MMMM YYYY")
    return month.date === monthNow
  })

  return (
    <Carousel 
      opts={{
        align: "center",
        startIndex: foundIndex
      }}
      setApi={setApi}
      className="w-3/5 md:w-3/4"
    >
      <CarouselContent className="-ml-1">
        <CarouselItem className="hidden lg:block lg:basis-1/5"></CarouselItem>
        <CarouselItem className="hidden lg:block lg:basis-1/5"></CarouselItem>
        {
          data.map((month, index) => {
            return (
              <CarouselItem key={month.date} className="basis-1/2 lg:basis-1/5 cursor-pointer pl-1" onClick={() => api?.scrollTo(index)}>
                <Card className={ api?.selectedScrollSnap() === index ? cn(getColor(league, "accent"), getColor(league, "accent-text")) : "bg-white border" }>
                  <CardContent className="py-3 flex aspect-video items-center text-center justify-center">
                    <span className="font-semibold">{ month.date }</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })
        }
        <CarouselItem className="hidden lg:block lg:basis-1/5"></CarouselItem>
        <CarouselItem className="hidden lg:block lg:basis-1/5"></CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}