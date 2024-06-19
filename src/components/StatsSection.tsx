import { StatCategoryType } from "@/lib/type";
import { StatTable } from "./StatTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn, getColor } from "@/lib/utils";

export const StatsSection = ({ data, league }: { data: { team: StatCategoryType[], player:StatCategoryType[] }, league: string }) => {
  return (
    <Tabs defaultValue="club">
      <TabsList className={cn("grid w-full grid-cols-2", getColor(league, "accent"), getColor(league, "accent-text"))}>
        <TabsTrigger value="club" className="font-semibold">Team Stats</TabsTrigger>
        <TabsTrigger value="player" className="font-semibold">Player Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="club">
        <div className="grid md:grid-cols-2 gap-3">
          {data.team.map((stat) => {
            return <StatTable key={stat.name} title={stat.name} data={stat.stats} league={league} />;
          })}
        </div>
      </TabsContent>
      <TabsContent value="player">
        <div className="grid md:grid-cols-2 gap-3">
          {data.player.map((stat) => {
            return <StatTable key={stat.name} title={stat.name} data={stat.stats} league={league} />;
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
};
