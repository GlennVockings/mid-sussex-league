import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatType } from "@/lib/type";
import { TeamName } from "./TeamName";
import { cn, getColor } from "@/lib/utils";

export const StatTable = ({ title, data, league } : { title : string, data: StatType[], league: string }) => {

  const columnHelper = createColumnHelper<StatType>();

  const columns = [
    columnHelper.accessor('team', {
      header: 'Team',
      cell: (cell) => (
      <div className="flex items-center gap-2">
        <TeamName teamName={ cell.row.original.team } name={ cell.row.original.player || cell.row.original.team } />
      </div>
    )
    }),
    columnHelper.accessor('stat', {
      header: title
    })
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <div className="bg-white rounded-xl w-full">
      <div className={cn("rounded-t-xl", getColor(league, "accent"))}>
        <p className={cn("font-semibold py-2 pl-4", getColor(league, "accent-text"))}>{ title }</p>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
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
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>
    </div>
  )
}