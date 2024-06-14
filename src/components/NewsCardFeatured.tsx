import { cn, convertDate, getColor } from "@/lib/utils"
import Image from "next/image"

export const NewsCardFeatured = ({title, image, summary, tag, createdAt} : {title: string, image: string, summary: string, tag: string, createdAt: string}) => {
  return (
    <div className="rounded-lg overflow-hidden col-span-2 row-span-4">
      <div className="relative w-full aspect-video">
        <Image src={image} alt={title} className="object-cover" fill />
      </div>
      <div className="bg-white p-2 h-full flex flex-col gap-3">
        <div className="flex gap-2">
          <p className="text-[12px]">{ convertDate(createdAt, "Do MMM")}</p>
          <div className={cn("w-2 h-full", getColor(tag, "background"))}></div>
          <p className="text-[12px]">{ tag }</p>
        </div>
        <p className="font-bold text-3xl">{ title }</p>
        <p className="text-lg">{summary }</p>
      </div>
    </div>
  )
}