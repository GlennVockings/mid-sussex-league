import { useQuery } from "@tanstack/react-query";
import { getLeagues, getLeague, getAllLeagueData, getLeagueName, getLeagueSummary } from "@/lib/queries";

export function useAllLeagues() {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: () => getLeagues()
  })
}

export function useLeagueById(id: string) {
  return useQuery({
    queryKey: ['league', id],
    queryFn: () => getLeague(id)
  }) 
}

export function useLeagueSummaryById(id: string) {
  return useQuery({
    queryKey: ['league', id],
    queryFn: () => getLeagueSummary(id)
  }) 
}

export function useLeagueByName(name: string) {
  return useQuery({
    queryKey: ['league', name],
    queryFn: () => getLeagueName(name)
  })
}

export function useAllleagueData() {
  return useQuery({
    queryKey: ['admin', 'leagues'],
    queryFn: () => getAllLeagueData()
  })
}