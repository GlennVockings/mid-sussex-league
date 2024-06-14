"use client"

import { AdminSeason } from "@/components/Admin/Team/AdminSeason";
import { VenueForm } from "@/components/Admin/Team/VenueForm";
import { Loading } from "@/components/Loading";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useTeamById } from "@/hooks/use-team";

export default function AdminLeague({ params } : { params: { id: string }}) {
    const { data, isLoading } = useTeamById(params.id);


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
                <BreadcrumbLink href="#">{ data.name }</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </MaxWidthWrapper>
      </section>
      <section className="bg-slate-200">
        <MaxWidthWrapper>
          <div>
            <VenueForm data={data} />
          </div>
          <div>
            <div>
              <p className="font-semibold text-lg underline underline-offset-1">Seasons</p>
            </div>
            {
              data.seasons?.map(season => (<AdminSeason key={season._id} data={season} teamId={data._id} /> ))
            }
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}