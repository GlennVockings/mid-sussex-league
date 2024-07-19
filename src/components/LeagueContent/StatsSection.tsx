"use client"

import { cn } from "@/lib/utils";
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { TeamName } from "../TeamName";
import { LeagueTeamType } from "@/lib/type";

export const StatsSection = ({ data } : { data: LeagueTeamType[] }) => {
  const [tab, setTab] = useState<string>("team");

  const columnHelper = createColumnHelper<LeagueTeamType> ();

  const columns = [
     columnHelper.accessor('team.name', {
      header: 'Team',
      cell: (cell) => (
        <div className="flex items-center gap-2">
          <span>{cell.row.index + 1}</span>
          <TeamName teamName={cell.row.original.team.name} />
        </div>
      )
    }),
    columnHelper.accessor('goals', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>P</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.goals }</span>
        </div>
      )
    }),
    columnHelper.accessor('yellowCards', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>W</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.yellowCards }</span>
        </div>
      )
    }),
    columnHelper.accessor('redCards', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>D</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.redCards }</span>
        </div>
      )
    }),
    columnHelper.accessor('cleanSheets', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>L</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.cleanSheets }</span>
        </div>
      )
    })
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-center p-1 bg-gray-200 rounded-md">
          <div className={cn("min-w-28 flex justify-center py-1 rounded-md", tab === "team" ? "bg-blue-700 text-white" : "")} onClick={() => setTab("team")}>Team</div>
          <div className={cn("min-w-28 flex justify-center py-1 rounded-md", tab === "players" ? "bg-blue-700 text-white" : "")} onClick={() => setTab("players")}>Players</div>
        </div>
      </div>
      {/* team stats */}
      <div className={cn(tab === "team" ? "" : "hidden")}>

      </div>
    </div>
  )
}