"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { IoArrowForwardOutline } from "react-icons/io5";
import { TableType } from "@/lib/type";
import { TeamName } from "./TeamName";
import Link from "next/link";
import { cn, getColor } from "@/lib/utils";

const columnHelper = createColumnHelper<TableType> ()

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
    header: "P"
  }),
  columnHelper.accessor('for', {
    header: "GD",
    cell: (cell) => (
      <div className="flex items-center gap-2">
        <span>{ cell.row.original.for - cell.row.original.against }</span>
      </div>
    )
  }),
  columnHelper.accessor('points', {
    header: "PTS"
  })
]


export const SlimLeagueTable = ({ data, league } : { data: TableType[], league: string }) => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="flex flex-col items-center bg-white rounded-lg h-98">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="px-2 font-bold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => {
            if (index < 5)
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="px-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="py-2">
        <Button variant="secondary" className={cn("flex gap-2", getColor(league, "accent"), getColor(league, "accent-text"))} asChild>
          <Link href={`/${encodeURIComponent(league.toLowerCase())}`}>
            View full table
            <IoArrowForwardOutline />
          </Link>
        </Button>
      </div>
    </div>
  )
}