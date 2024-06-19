import { getAllPlayers } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

export function useAllPlayers() {
  return useQuery({
    queryKey: ['players'],
    queryFn: () => getAllPlayers()
  })
}