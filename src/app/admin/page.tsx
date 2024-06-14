"use client"

import React from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Loading } from "@/components/Loading";
import { useAllLeagues } from "@/hooks/use-league";
import { useAllTeams } from "@/hooks/use-team";

export default function Admin() {
  const { data: LeaguesData, isLoading: LeaguesLoading } = useAllLeagues();
  const { data: TeamsData, isLoading: TeamsLoading } = useAllTeams();

  if (LeaguesLoading || TeamsLoading) {
    return <Loading />
  }

  if (LeaguesData === undefined || TeamsData === undefined) {
    return <div>No Information</div>
  }

  return (
    <>
      <section className="py-4">
        <MaxWidthWrapper>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </MaxWidthWrapper>
      </section>
      <section className="py-4">
        <MaxWidthWrapper>
          <div className="flex flex-col gap-4">
            <div>
              <div className="py-2">
                <p className="font-bold text-lg">Leagues</p>
              </div>
              <div className="flex gap-3">
                {
                  LeaguesData.map(league => {
                    return (
                      <Link key={league.league} href={`/admin/league/${ league._id }`} className="py-2 px-4 bg-gray-300 rounded-lg">{ league.league }</Link>
                    )
                  })
                }
              </div>
            </div>
            <div>
              <div className="py-2">
                <p className="font-bold text-lg">Teams</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {
                  TeamsData.map(team => {
                    return (
                      <Link key={team.name} href={`/admin/team/${ team._id }`} className="py-2 px-4 bg-gray-300 rounded-lg">{ team.name }</Link>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
