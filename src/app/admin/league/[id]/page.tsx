"use client"

import { AdminSeason } from "@/components/Admin/League/AdminSeason";
import { Loading } from "@/components/Loading";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLeagueById } from "@/hooks/use-league";

export default function AdminLeague({ params } : { params: { id: string }}) {
  const { data, isLoading } = useLeagueById(params.id);


  if (isLoading) {
    return <Loading />
  }

  if (data === undefined) {
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{ data.league }</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">{ data.league }</p>
            <div className="flex flex-col gap-4">
              {
                data.seasons.map(season => {
                  return (
                    <AdminSeason key={season.season} season={season} leagueId={params.id} />
                  )
                })
              }
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}