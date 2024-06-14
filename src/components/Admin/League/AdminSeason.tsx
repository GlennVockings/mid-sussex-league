import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { cn, convertDate } from "@/lib/utils";
import { TeamName } from "@/components/TeamName";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { AdminForm } from "./AdminForm";
import { FixtureType, SeasonType } from "@/lib/type";
import { AdminTable } from "./AdminTable";

export const AdminSeason = ({ season, leagueId } : { season: SeasonType, leagueId: string}) => {
  const [ isSeasonOpen, setIsSeasonOpen ] = useState(false);
  const [ isTableOpen, setIsTableOpen ] = useState(false);
  const [ isFixtureOpen, setIsFixtureOpen ] = useState(false);
  const [teamFilter, setTeamFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFixtureData, setEditFixtureData] = useState<FixtureType>({
    _id: "", home: "", away: "", score: { home: 0, away: 0 }, venue: "", dateTime: "", status: "", events: []
  });

  const handleOnClick = (fixture: FixtureType) => {
    setIsModalOpen(true);
    setEditFixtureData(fixture);
  };

  return (
    <div className="bg-gray-200 rounded-lg">
      <button onClick={() => setIsSeasonOpen(!isSeasonOpen)} className="flex w-full justify-between items-center gap-3 p-2">
        <div className="flex gap-3">
          <p>{season.season}</p>
          <Badge>{season.status}</Badge>
        </div>
        <div>{ isSeasonOpen ? <FaMinus /> : <FaPlus />}</div>
      </button>
      <div className={cn("relative overflow-y-scroll transition-all flex flex-col gap-4", isSeasonOpen ? "h-[1000px] p-2 pt-0" : "h-0 p-0")}>
        <div>
          <button 
            onClick={() => setIsTableOpen(!isTableOpen)} 
            className="flex justify-between items-center gap-3 w-full bg-white p-2 rounded-lg"
          >
            <div className="flex gap-3">
              <p>Table</p>
            </div>
            <div>{ isTableOpen ? <FaMinus /> : <FaPlus />}</div>
          </button>
          <div className={cn("bg-white w-[90%] rounded-lg overflow-y-scroll transition-all", isTableOpen ? "h-[880px] mt-2" : "h-0 m-0")}>
            <div>
              <div className="grid grid-cols-8 justify-items-center">
                <div>Name</div>
                <div>Ply</div>
                <div>Wins</div>
                <div>Draws</div>
                <div>Loses</div>
                <div>For</div>
                <div>Against</div>
                <div>Points</div>
              </div>
              <AdminTable table={season.table} leagueId={leagueId} seasonId={season._id} />
            </div>
          </div>
        </div>
        <div>
          <button 
            onClick={() => setIsFixtureOpen(!isFixtureOpen)} 
            className="flex justify-between items-center gap-3 w-full bg-white p-2 rounded-lg"
          >
            <div className="flex gap-3">
              <p>Fixtures</p>
            </div>
            <div>{ isFixtureOpen ? <FaMinus /> : <FaPlus />}</div>
          </button>
          <div className={cn("bg-white w-full rounded-lg overflow-y-scroll transition-all", isFixtureOpen ? "h-[880px] mt-2" : "h-0 m-0")}>
            <div className="py-2 bg-gray-200 sticky top-0">
              <p className="font-bold">Filter</p>
              <div className="flex items-center gap-3">
                <p>Team:</p>
                <div className="w-40">
                  <Select onValueChange={(e) => setTeamFilter(e)} value={teamFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team.." />
                    </SelectTrigger>
                    <SelectContent>
                      {season.teams.map((team) => (
                        <SelectItem key={team.name} value={team.name}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  {teamFilter !== "" && (
                    <Badge variant="secondary" className="flex gap-2">
                      {teamFilter}
                      <button onClick={() => setTeamFilter("")}>
                        <MdClose />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4">
              {
                season.fixtures.map((fixture) => {
                  if (teamFilter === fixture.home || teamFilter === fixture.away || teamFilter === "") {
                    return (
                      <button key={fixture._id} onClick={() => handleOnClick(fixture)}>
                        <div>
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between p-2">
                              {fixture.dateTime && (
                                <p className="text-xs">{convertDate(fixture.dateTime, "DD/MM/YYYY HH:mm")}</p>
                              )}
                              {fixture.status && (
                                <Badge>{fixture.status}</Badge>
                              )}
                            </CardHeader>
                            <CardContent className="p-2">
                              <div className="flex flex-col gap-3">
                                <div className="flex justify-between font-bold">
                                  <TeamName teamName={fixture.home} />
                                  {fixture.status === "completed" && (
                                    <p className="pr-1">{fixture.score?.home}</p>
                                    )}
                                </div>
                                <div className="flex justify-between font-bold">
                                  <TeamName teamName={fixture.away} />
                                  {fixture.status === "completed" && (
                                    <p className="pr-1">{fixture.score?.away}</p>
                                    )}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="p-2">
                              <p className="text-xs truncate">{fixture.venue}</p>
                            </CardFooter>
                          </Card>
                        </div>
                      </button>
                    );
                  }
                  return null;
                })
              }
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AdminForm
        setIsModalOpen={setIsModalOpen}
        editFixtureData={editFixtureData}
        seasonId={season._id}
        leagueId={leagueId}
        teams={season.teams}
        />
      )}
    </div>
  );
};
