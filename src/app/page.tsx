import { Separator } from "@/components/ui/separator";
import { LeagueSummary } from "@/components/LeagueSummary/LeagueSummary";
import { BadgeList } from "@/components/BadgeList";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LeagueSummary />
      <Separator />
      <BadgeList />
    </>
  );
}
