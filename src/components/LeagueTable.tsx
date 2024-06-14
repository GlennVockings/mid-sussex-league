"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TeamName } from "./TeamName";
import { cn, getColor } from "@/lib/utils";

interface TableType {
  team: {
    name: string
  }
  played: number
  wins: number
  draws: number
  loses: number
  for: number
  against: number
  goalDifference: number
  points: number
}



const columnHelper = createColumnHelper<TableType> ()

export const LeagueTable = ({ data, expanded, teamName } : { data: TableType[], expanded: boolean, teamName?: string }) => {
  const columns = [
     columnHelper.accessor('team', {
      header: 'Team',
      cell: (cell) => (
        <div className="flex items-center gap-2">
          <span>{cell.row.index + 1}</span>
          <TeamName teamName={cell.row.original.team.name} />
        </div>
      )
    }),
    columnHelper.accessor('played', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>P</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.played }</span>
        </div>
      )
    }),
    columnHelper.accessor('wins', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>W</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.wins }</span>
        </div>
      )
    }),
    columnHelper.accessor('draws', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>D</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.draws }</span>
        </div>
      )
    }),
    columnHelper.accessor('loses', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>L</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.loses }</span>
        </div>
      )
    }),
    columnHelper.accessor('for', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>F</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.for }</span>
        </div>
      )
    }),
    columnHelper.accessor('against', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>A</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.against }</span>
        </div>
      )
    }),
    columnHelper.accessor('goalDifference', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>GD</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.for - cell.row.original.against }</span>
        </div>
      )
    }),
    columnHelper.accessor('points', {
      header: () => (
        <div className="flex justify-center items-center">
          <span>PTS</span>
        </div>
      ),
      cell: (cell) => (
        <div className="flex justify-center items-center">
          <span>{ cell.row.original.points }</span>
        </div>
      )
    })
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                if (header.column.id === "wins" && !expanded) return
                if (header.column.id === "loses" && !expanded) return
                if (header.column.id === "draws" && !expanded) return
                if (header.column.id === "for" && !expanded) return
                if (header.column.id === "against" && !expanded) return
                return <TableHead key={header.id} className="px-2 font-bold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => {
            return (
              <TableRow key={row.id} className={`${row.original.team.name === teamName ? cn(getColor(row.original.team.name, "accent"), getColor(row.original.team.name, "accent-text")) : ""}`}>
                {row.getVisibleCells().map(cell => {
                  if (cell.column.id === "wins" && !expanded) return
                  if (cell.column.id === "loses" && !expanded) return
                  if (cell.column.id === "draws" && !expanded) return
                  if (cell.column.id === "for" && !expanded) return
                  if (cell.column.id === "against" && !expanded) return
                  return <TableCell key={cell.id} className="px-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}