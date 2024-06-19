"use client"

import { Loading } from "@/components/Loading";
import { useAllFixtures } from "@/hooks/use-fixture";

export default function Fixtures() {
  const { data, isLoading } = useAllFixtures();

  if (isLoading) {
    return <Loading />
  }

  if (data === undefined) {
    return <div>No Information</div>
  }

  return (
    <div>
      <p>Fixtures</p>
    </div>
  )
}