import Image from "next/image"
import { AspectRatio } from "./ui/aspect-ratio"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { NewsType } from "@/lib/type"
import { cn, convertDate, getColor } from "@/lib/utils"
import { Badge } from "./ui/badge"

export const NewsCard = ({title, image, summary, createdAt, tag} : NewsType ) => {
  return (
    <Card>
      <CardHeader className="p-1">
        <AspectRatio ratio={16 / 9}>
          <Image src={image} alt={title} fill className="rounded-md object-cover"/>
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-xs">{convertDate(createdAt, "Do MMM YYYY HH:mm")}</p>
          </div>
          <p className="text-lg font-bold">{title}</p>
          <p>{summary}</p>
        </div>
      </CardContent>
      <CardFooter className="px-3 pb-2">
        <div className="flex gap-2">
          <Badge className={cn("text-black", getColor(tag, "background"), getColor(tag, "text"))}>{tag}</Badge>
        </div>
      </CardFooter>
    </Card>
  )
}