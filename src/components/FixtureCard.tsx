import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { FixtureType } from "@/lib/type";
import { TeamName } from "./TeamName";
import { convertDate } from "@/lib/utils";

export const FixtureCard = ({ fixture } : { fixture: FixtureType }) => {
  return (
    <Card>
      <CardHeader className="p-2">
        <p className="text-xs">{ convertDate(fixture.dateTime, "DD/MM/YYYY HH:MM") }</p>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between font-bold">
            <TeamName teamName={fixture.home} />
            {
              fixture.status === "completed" ? (
                <p className="pr-1 font-semibold">{ fixture.score.home }</p>
              ) : ""
            }
          </div>
          <div className="flex justify-between font-bold">
            <TeamName teamName={fixture.away} />
            {
              fixture.status === "completed" ? (
                <p className="pr-1 font-semibold">{ fixture.score.away }</p>
              ) : ""
            }
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2">
        <p className="text-xs truncate">{ fixture.venue }</p>
      </CardFooter>
    </Card>
  )
}