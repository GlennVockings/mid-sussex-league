import Image from "next/image";
import { cn, replaceWithDash } from "@/lib/utils";

export const TeamName = ({ teamName, className, name } : { teamName: string, className?: string, name?: string }) => {
  return (
    <div className={cn("flex gap-2 items-center w-5/6", className)}>
      <Image src={`/assets/${replaceWithDash(teamName)}-icon.png`} width={24} height={24} alt={teamName} />
      <p className="truncate min-w-0 font-semibold">{ name || teamName }</p>
    </div>
  )
}