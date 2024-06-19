import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { LeagueSummaryType, TeamSeasonType } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface SeasonInfo {
  manager: string
  league: string
  stats: {
    goals: number
    yellowCards: number
    redCards: number
    cleanSheets: number
  }
}

const formSchema = z.object({
  manager: z.string(),
  league: z.string(),
  stats: z.object({
    goals: z.number().int(),
    redCards: z.number().int(),
    yellowCards: z.number().int(),
    cleanSheets: z.number().int()
  })
})

export const SeasonEdit = ({ data, seasonId, leagues, teamId } : { data: TeamSeasonType, seasonId: string, leagues?: LeagueSummaryType[], teamId: string }) => {
  const [ editForm, setEditForm ] = useState(false)
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manager: data.manager || "",
      league: data.league._id || "",
      stats: {
          goals: data.stats.goals || 0,
          redCards: data.stats.redCards || 0,
          yellowCards: data.stats.yellowCards || 0,
          cleanSheets: data.stats.cleanSheets || 0
      }
    },
  })

  const mutation = useMutation({
    mutationFn: (season: SeasonInfo) => {
      return axios.patch(
        `http://localhost:5000/api/v1/teams/${teamId}/${seasonId}/info`, {
          manager: season.manager,
          league: season.league,
          stats: {
            goals: season.stats.goals,
            yellowCards: season.stats.yellowCards,
            redCards: season.stats.redCards,
            cleanSheets: season.stats.cleanSheets
          }
        })
    },
    onSuccess: (data, variables, context) => {
      toast({
        title: `Season updated`
      })
    }
  })

  function onEditForm(e: any) {
    e.preventDefault();
    setEditForm(!editForm);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
    setEditForm(!editForm);
  }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2 py-2">
            <p className="font-semibold">League:</p>
            <FormField 
              control={form.control}
              name="league"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!editForm}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a league" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          leagues?.map(league => (
                            <SelectItem key={league._id} value={league._id}>{ league.league }</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold pb-2">Manger:</p>
            <FormField 
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} disabled={!editForm} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 pb-4">
            <div>
              <p className="font-semibold text-lg pb-2">Stats</p>
            </div>
            <div className="border grid grid-cols-4 gap-3 rounded-lg justify-items-center">
              <div className="p-2 flex flex-col items-center">
                <p className="font-semibold">Goals</p>
                <FormField 
                  control={form.control}
                  name="stats.goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={!editForm} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="p-2 flex flex-col items-center">
                <p className="font-semibold">Yellow cards</p>
                <FormField 
                  control={form.control}
                  name="stats.yellowCards"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={!editForm} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="p-2 flex flex-col items-center">
                <p className="font-semibold">Red cards</p>
                <FormField 
                  control={form.control}
                  name="stats.redCards"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={!editForm} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="p-2 flex flex-col items-center">
                <p className="font-semibold">Clean sheets</p>
                <FormField 
                  control={form.control}
                  name="stats.cleanSheets"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={!editForm} onChange={(e) => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 p-4">
            <Button onClick={(e) => onEditForm(e)}>Edit</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}