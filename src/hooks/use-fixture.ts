import { getFixtures } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

export function useAllFixtures() {
  return useQuery({
    queryKey: [ 'fixtures' ],
    queryFn: () => getFixtures()
  })
}