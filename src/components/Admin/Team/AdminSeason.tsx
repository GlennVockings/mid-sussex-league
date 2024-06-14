"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TeamSeasonType } from "@/lib/type"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { NewPlayerForm } from "../Player/newPlayerForm"
import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa"
import { SeasonEdit } from "./SeasonEdit"
import { useAllLeagues } from "@/hooks/use-league"
import { Loading } from "@/components/Loading"

export const AdminSeason = ({ data, teamId } : {data: TeamSeasonType, teamId: string }) => {
  const [ addPlayer, setAddPlayer ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ playerSearch, setPlayerSearch ] = useState("");

  const { data: leagueData, isLoading } = useAllLeagues();

  let totals = {
    appearances: 0,
    goals: 0,
    yellowCards: 0,
    redCards: 0,
    assists: 0,
    cleanSheets: 0,
    pom: 0,
    started: 0
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPlayerSearch(e.target.value);
  }

  if (isLoading) {
    <Loading />
  }

  return (
    <div className="py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between w-full items-center gap-3 pb-4">
        <div className="flex gap-4 items-center">
          <p className="text-lg font-semibold">{ data.season }</p>
          <Badge>{ data.status }</Badge>
        </div>
        <div>
          {
            isOpen ? <FaMinus /> : <FaPlus />
          }
        </div>
      </button>
      <div className={cn("bg-white rounded-lg overflow-y-scroll transition-all", isOpen ? "h-[800px] p-4" : "h-0 p-0")}>
        <div className="flex gap-2 pb-2">
          <p className="font-semibold">Season:</p>
          <p>{ data.season }</p>
        </div>
        <div className="flex gap-2 pb-2">
          <p className="font-semibold">Status:</p>
          <p>{ data.status }</p>
        </div>
        <Separator />
        <SeasonEdit data={data} seasonId={data._id} leagues={leagueData} teamId={teamId} />
        <Separator />
        <div className="py-2">
          <div className="flex gap-3 items-center pt-2">
            <p className="text-xl font-semibold underline">Players</p>
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="flex gap-2">
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <Input placeholder="Search" className="min-w-40" onChange={(e) => handleSubmit(e)} />
                <Button type="submit">
                  <FaSearch />
                </Button>
              </form>
              <Button onClick={() => setAddPlayer(prev => !prev)}>
                {
                  addPlayer ? <FaMinus /> : <FaPlus /> 
                }
              </Button>
            </div>
            <div className={ addPlayer ? "flex w-full" : "hidden"}>
              <NewPlayerForm teamId={teamId} season={data.season} />
            </div>
          </div>
          <div className="">
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead className="p-1">Name</TableHead>
                  <TableHead className="p-1">Appearances</TableHead>
                  <TableHead className="p-1">Goals</TableHead>
                  <TableHead className="p-1">Yellow Cards</TableHead>
                  <TableHead className="p-1">Red Cards</TableHead>
                  <TableHead className="p-1">Assists</TableHead>
                  <TableHead className="p-1">Started</TableHead>
                  <TableHead className="p-1">Player of the Match</TableHead>
                  <TableHead className="p-1">Clean Sheets</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  data.players.map(player => {
                    if (player.firstName.toLowerCase().includes(playerSearch.toLowerCase()) || player.lastName.toLowerCase().includes(playerSearch.toLowerCase()) || playerSearch === undefined)
                    totals.goals += player.seasons[0].stats[0].goals
                    totals.appearances += player.seasons[0].stats[0].appearances
                    totals.yellowCards += player.seasons[0].stats[0].yellowCards
                    totals.redCards += player.seasons[0].stats[0].redCards
                    totals.assists += player.seasons[0].stats[0].assists
                    totals.started += player.seasons[0].stats[0].started
                    totals.pom += player.seasons[0].stats[0].playerofMatch
                    totals.cleanSheets += player.seasons[0].stats[0].cleanSheet
                    return (
                      <TableRow key={player._id}>
                        <TableCell className="p-1 pt-2">{ `${player.firstName} ${player.lastName}`}</TableCell>
                        <TableCell className="p-1 pt-2">{ player.seasons[0].stats[0].appearances}</TableCell>
                        <TableCell className="p-1 pt-2">{ player.seasons[0].stats[0].goals }</TableCell>
                        <TableCell className="p-1 pt-2">{ player.seasons[0].stats[0].yellowCards}</TableCell>
                        <TableCell className="p-1 pt-2">{ player.seasons[0].stats[0].redCards}</TableCell>
                        <TableCell className="p-1 pt-2">{ player.seasons[0].stats[0].assists}</TableCell>
                        <TableCell className="p-1 pt-2">{ player.seasons[0].stats[0].started}</TableCell>
                        <TableCell className="p-1 pt-2">{ player.seasons[0].stats[0].playerofMatch}</TableCell>
                        <TableCell className="p-1 pt-2">{ player.seasons[0].stats[0].cleanSheet}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{ totals.appearances }</TableCell>
                  <TableCell>{ totals.goals }</TableCell>
                  <TableCell>{ totals.yellowCards }</TableCell>
                  <TableCell>{ totals.redCards }</TableCell>
                  <TableCell>{ totals.assists }</TableCell>
                  <TableCell>{ totals.started }</TableCell>
                  <TableCell>{ totals.pom }</TableCell>
                  <TableCell>{ totals.cleanSheets }</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}