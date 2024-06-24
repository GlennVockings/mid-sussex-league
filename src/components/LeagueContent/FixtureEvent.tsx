import { TeamName } from "../TeamName"
import { RiFootballLine } from "react-icons/ri";
import { TbRectangleVerticalFilled } from "react-icons/tb";

export const FixtureEvent = ({ player, team, type } : { player: string, team: string, type: string }) => {

  function renderType(eventType: string) {
    switch (eventType) {
      case "goal":
        return (
          <RiFootballLine />
        )
      case "yellowCard":
        return (
          <TbRectangleVerticalFilled className="text-yellow-500" />
        )
      case "redCard":
        return (
          <TbRectangleVerticalFilled className="text-red-500" />
        )
      default:
        break;
    }
  }
  return (
    <div className="flex justify-around items-center">
      <TeamName teamName={team} name={player} />
      {
        renderType(type)
      }
    </div>
  )
}