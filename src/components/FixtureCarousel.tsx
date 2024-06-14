"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FixtureCard } from "./FixtureCard";
import { FixtureType } from "@/lib/type";

export const FixtureCarousel = ({ data } : { data : FixtureType[] }) => {
  
  return (
    <Carousel className="w-full" opts={{
      align: "start",
      loop: true,
    }}>
      <CarouselContent>
        {
          data.map((fixture, index) => {
          if (index < 7) {
            return (
              <CarouselItem key={fixture._id} className="basis-1/4">
                <FixtureCard fixture={fixture} />
              </CarouselItem>
            )
          }
        })
      }
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  )
}