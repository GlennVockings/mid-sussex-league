import { NewsType } from "@/lib/type"
import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { NewsCard } from "./NewsCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

export const NewsCarousel = ({data}:{data: NewsType[] }) => {
  return (
    <section className="md:hidden">
      <MaxWidthWrapper>
        <div>
          <div className="py-4">
            <p className="text-xl font-bold">News</p>
          </div>
          <div className="w-[90%] mx-auto">
            <Carousel>
              <CarouselContent>
                {
                  data.map((news, index) => {
                    if (index > 8) return ""
                    return (
                      <CarouselItem key={news.title} className="basis-1/3">
                        <NewsCard {...news} />
                      </CarouselItem>
                    )
                  })
                }
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}