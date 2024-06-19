"use client"

import { LeagueSummaryType } from "@/lib/type";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { Button } from "../ui/button";
import { FaSearch, FaCheck } from "react-icons/fa";

export const LeagueSelector = ({ setActiveLeague, data, activeLeague } : { setActiveLeague: Function, data: LeagueSummaryType[], activeLeague: string }) => {
  const [open, setOpen ] = useState(false);
  const [value, setValue] = useState(activeLeague)

  console.log(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((league) => league.league === value)?.league
            : "Select league..."}
          <FaSearch className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search league..." className="h-9" />
          <CommandList>
            <CommandEmpty>No leagues found.</CommandEmpty>
            <CommandGroup>
              {data.map((league) => (
                <CommandItem
                  key={league._id}
                  value={league.league}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setActiveLeague(currentValue)
                    setOpen(false)
                  }}
                >
                  {league.league}
                  <FaCheck
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === league._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}