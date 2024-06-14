import { Button } from "@/components/ui/button"
import { PlayerType } from "@/lib/type"
import { IoFootball } from "react-icons/io5";
import { FaTrophy, FaPersonRunning } from "react-icons/fa6";

export const AdminFixtureEvents = ({ player, team, handleAddEvent } : { player: PlayerType, team: string, handleAddEvent: (type: string, player: string, team: string) => void }) => {

  return (
    <div className="flex items-center justify-between py-1 gap-2">
      <span>{`${player.firstName} ${player.lastName}`}</span>
      <div className="flex space-x-1">
        <Button type="button" className="px-2 py-1" onClick={() => handleAddEvent('goal', `${player.firstName} ${player.lastName}`, team)}><IoFootball /></Button>
        <Button type="button" className="px-2 py-1" onClick={() => handleAddEvent('yellowCard', `${player.firstName} ${player.lastName}`, team)}>
          <div>
            <div className="bg-[#ffff00] w-3 h-4"></div>
          </div>
        </Button>
        <Button type="button" className="px-2 py-1" onClick={() => handleAddEvent('redCard', `${player.firstName} ${player.lastName}`, team)}>
          <div>
            <div className="bg-[#ff0000] w-3 h-4"></div>
          </div>
        </Button>
        <Button type="button" className="px-2 py-1" onClick={() => handleAddEvent('mom', `${player.firstName} ${player.lastName}`, team)}><FaTrophy /></Button>
        <Button type="button" className="px-2 py-1" onClick={() => handleAddEvent('appearance', `${player.firstName} ${player.lastName}`, team)}><FaPersonRunning /></Button>
      </div>
    </div>
  )
}