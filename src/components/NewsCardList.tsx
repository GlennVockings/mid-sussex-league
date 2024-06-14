import { cn, convertDate, getColor } from "@/lib/utils"
import Image from "next/image"

export const NewsCardList = ({title, image, summary, tag, createdAt} : {title: string, image: string, summary: string, tag: string, createdAt: string}) => {
  return (
    <div className="flex items-center rounded-lg overflow-hidden bg-white min-h-20">
      <div className="h-full w-full max-w-2/5">
        <div className="relative h-full w-full aspect-video">
          <Image src={image} alt={title} className="object-cover" fill />
        </div>
      </div>
      <div className="px-1 pt-2 flex flex-col gap-1 flex-grow h-full lg:pl-2 lg:pt-3 xl:gap-3">
        <div className="flex gap-1 text-[10px] xl:text-[12px]">
          <p className="text-nowrap">{ convertDate(createdAt, "Do MMM")}</p>
          <div className={cn("w-2 h-full", getColor(tag, "background"))}></div>
          <p className="truncate">{ tag }</p>
        </div>
        <p className="font-semibold text-base xl:text-xl">{ title }</p>
      </div>
    </div>
  )
}