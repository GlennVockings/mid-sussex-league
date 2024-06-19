import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { HeroSection } from '@/components/HeroSection';
import { LeagueSummary } from '@/components/LeagueSummary/LeagueSummary';
import { Separator } from '@/components/ui/separator';
import { BadgeList } from '@/components/BadgeList';
import { getLeagueName, getLeagues } from '@/lib/queries';

export default async function Home() {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['leagues'], queryFn: getLeagues }),
    queryClient.prefetchQuery({ queryKey: ['league', 'premier-league'], queryFn: () => getLeagueName('premier-league') })
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeroSection />
      <LeagueSummary />
      <Separator />
      <BadgeList />
    </HydrationBoundary>
  )
}
