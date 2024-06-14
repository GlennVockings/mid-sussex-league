"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

interface newPlayer {
  firstName: string
  lastName: string
  team: string
  season: string
}

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName:z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  team: z.string().min(2, {
    message: "Team ID must be filled out.",
  }),
  season: z.string().min(1, {
    message: "Season player is involved in e.g. 2023-24"
  })
})

export const NewPlayerForm = ({ teamId, season } : { teamId: string, season: string }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      team: teamId,
      season: season
    },
  })

  const mutation = useMutation({
    mutationFn: (newPlayer: newPlayer) => {
      return axios.post(
        `http://127.0.0.1:5000/api/v1/players`, [{
          firstName: newPlayer.firstName,
          lastName: newPlayer.lastName,
          team: newPlayer.team,
          season: newPlayer.season
        }])
    },
    onSuccess: (data, variables, context) => {
      toast({
        title: "New Player added"
      })
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
  }

  return (
    <div className="py-4 md:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-2">
            <FormField 
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="First name"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Last name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Season</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Team</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}