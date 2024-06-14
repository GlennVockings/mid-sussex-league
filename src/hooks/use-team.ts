import { useQuery } from "@tanstack/react-query";
import { getTeamById, getTeams, getTeamByName } from "@/lib/queries";

export function useAllTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: () => getTeams()
  })
}

export function useTeamById(id: string) {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => getTeamById(id)
  })
}

export function useTeamByName(name: string, year: string) {
  return useQuery({
    queryKey: ['team', name],
    queryFn: () => getTeamByName(name, year)
  })
}