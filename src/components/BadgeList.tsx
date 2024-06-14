"use client"

import { useAllTeams } from "@/hooks/use-team"
import Image from "next/image"
import { Loading } from "./Loading";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { replaceWithDash, uniqueTeams } from "@/lib/utils";

export const BadgeList = () => {
  const { data, isLoading } = useAllTeams();

  if (isLoading) {
    return <Loading />
  }

  if (data === undefined) {
    return <div>No Information</div>
  }

  const uniqueTeamsArray = uniqueTeams(data);
  
  return (
    <section>
        <MaxWidthWrapper>
          <div className="py-4 flex justify-center">
            <p className="text-xl font-bold">Teams</p>
          </div>
          <div className="flex gap-2 pb-4 flex-wrap justify-center md:justify-start md:gap-4">
            {
              uniqueTeamsArray.map(team => {
                return (
                  <div key={team._id}>
                    <Image src={`/assets/${replaceWithDash(team.name)}-icon.png`} width={48} height={48} alt={team.name} />
                  </div>
                )
              })
            }
          </div>
        </MaxWidthWrapper>
      </section>
  )
}