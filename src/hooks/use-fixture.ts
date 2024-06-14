import { getFixtures } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

export function useFixturesById(id: string) {
  return useQuery({
    queryKey: [ 'fixtures', id ],
    queryFn: () => getFixtures(id),
    enabled: !!id
  })
}