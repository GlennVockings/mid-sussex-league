"use client"

import { MdClose } from "react-icons/md"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { cn, sortPlayers } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../../ui/calendar"
import { FaCalendarDays } from "react-icons/fa6"
import { TimePickerDemo } from "../../ui/time-picker-demo"
import { FixtureType, TeamType } from "@/lib/type"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { AdminFixtureEvents } from "./AdminFixtureEvents"
import Link from "next/link"

interface EditFixture {
  _id: string
  home: string
  away: string
  score: {
    home: number
    away: number
  }
  dateTime: Date
  venue: string
  status: string
  events: {
    type: string
    player: string
    team: string
  }[]
}

const formSchema = z.object({
  _id: z.string(),
  home: z.string().min(2, {
    message: "Home team must be at least 2 characters.",
  }),
  away: z.string().min(2, {
    message: "Away team must be at least 2 characters.",
  }),
  venue: z.string().min(2, {
    message: "Venue must be at least 2 characters.",
  }),
  dateTime: z.date(),
  score: z.object({
    home: z.number().int(),
    away: z.number().int()
  }),
  status: z.string(),
  events: z.array(z.object({
    type: z.string(),
    player: z.string(),
    team: z.string(),
  }))
})

export const AdminForm = (
  { setIsModalOpen, editFixtureData, leagueId, seasonId, teams } : 
  { setIsModalOpen: (isOpen: boolean) => void, editFixtureData: FixtureType, leagueId: string, seasonId: string, teams: TeamType[] }
) => {
  const { toast } = useToast()

  const homeTeam = teams.find(team => team.name === editFixtureData.home)
  const awayTeam = teams.find(team => team.name === editFixtureData.away)

  const sortedHomePlayers = homeTeam?.seasons?.[0]?.players ? sortPlayers(homeTeam.seasons[0].players) : [];
  const sortedAwayPlayers = awayTeam?.seasons?.[0]?.players ? sortPlayers(awayTeam.seasons[0].players) : [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: editFixtureData._id || "",
      home: editFixtureData.home || "",
      away: editFixtureData.away || "",
      venue: editFixtureData.venue || "",
      dateTime: editFixtureData.dateTime ? new Date(editFixtureData.dateTime) : new Date(),
      score: {
        home: editFixtureData.score?.home !== undefined ? Number(editFixtureData.score?.home) : 0,
        away: editFixtureData.score?.away !== undefined ? Number(editFixtureData.score?.away) : 0,
      },
      status: editFixtureData.status,
      events: editFixtureData.events || []
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "events",
  })

  const mutation = useMutation({
    mutationFn: (editedFixture: EditFixture) => {
      const body = {
        _id: editedFixture._id,
        home: editedFixture.home,
        away: editedFixture.away,
        venue: editedFixture.venue,
        dateTime: editedFixture.dateTime.toISOString(),
        status: editedFixture.status,
        score: {
          home: editedFixture.score.home,
          away: editedFixture.score.away
        },
        events: editedFixture.events // Use events from editedFixture (form values)
      }
      return axios.patch(`http://localhost:5000/api/v1/leagues/${leagueId}/${seasonId}/${editedFixture._id}`, body)
    },
    onSuccess: (data, variables, context) => {
      toast({
        title: "Fixture updated"
      })
    }
  })


  const handleAddEvent = (type: string, player: string, team: string) => {
    append({ type, player, team })
  }
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
    setIsModalOpen(false)
  }

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-black/30">
      <div className="bg-white absolute p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <div className="flex justify-between text-lg">
          <p className="font-bold">Edit Fixture</p>
          <button onClick={() => setIsModalOpen(false)}>
            <MdClose />
          </button>
        </div>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
                control={form.control}
                name="_id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Id</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField 
                  control={form.control}
                  name="home"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="score.home"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Score</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <FormField 
                  control={form.control}
                  name="away"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Away</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="score.away"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Away Score</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 py-2">
                <FormField 
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a venue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          homeTeam?.ground?.map(stadium => (
                            <SelectItem key={stadium} value={stadium}>{stadium}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-between">
                      <FormLabel className="pt-1">Date / Time</FormLabel>
                      <FormControl>
                        <Popover>
                          <FormControl>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <FaCalendarDays className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP HH:mm:ss")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                          </FormControl>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                            <div className="p-3 border-t border-border">
                              <TimePickerDemo
                                setDate={field.onChange}
                                date={field.value}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField 
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TBC">TBC</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="home walkover">Home Walkover</SelectItem>
                        <SelectItem value="away walkover">Away Walkover</SelectItem>
                        <SelectItem value="postponed">Postponed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-2">
                <p className="font-bold underline">Events</p>
                <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-80">
                  <div>
                    <div className="flex gap-2 sticky top-0 bg-white">
                      <h3 className="font-semibold">{ homeTeam?.name }</h3>
                      <Link href={`/admin/team/${ homeTeam?._id }`}>Add player</Link>
                    </div>
                    {sortedHomePlayers.map((player) => (
                      <AdminFixtureEvents key={player._id} player={player} team={editFixtureData.home} handleAddEvent={handleAddEvent} />
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-2 sticky top-0 bg-white">
                      <h3 className="font-semibold">{ awayTeam?.name }</h3>
                      <Link href={`/admin/team/${ awayTeam?._id }`}>Add player</Link>
                    </div>
                    {sortedAwayPlayers.map((player) => (
                      <AdminFixtureEvents key={player._id} player={player} team={editFixtureData.away} handleAddEvent={handleAddEvent} />
                    ))}
                  </div>
                </div>
                <div className="py-4 overflow-y-scroll h-40">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between py-1">
                      <span>{`${item.team} - ${item.player} - ${item.type.toUpperCase()}`}</span>
                      <Button type="button" onClick={() => remove(index)}>X</Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-2">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
