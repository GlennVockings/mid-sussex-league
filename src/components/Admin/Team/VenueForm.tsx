"use client"

import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TeamType } from "@/lib/type"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { IoClose, IoAdd } from "react-icons/io5";

const formSchema = z.object({
  _id: z.string(),
  name: z.string().min(2, {
    message: "Home team must be at least 2 characters.",
  }),
  ground: z.array(z.string()),
  parent: z.string().min(2, {
    message: "Venue must be at least 2 characters.",
  }),
  abbr: z.string().min(1, {
    message: "Team abbreation must be filled out"
  })
})

export const VenueForm = ({ data } : { data: TeamType }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id:  data._id || "",
      name: data.name || "",
      ground: data.ground || [],
      parent: data.parent || "",
      abbr: data.abbr || ""
    },
  })
  
  const { fields, append, remove } = useFieldArray({  control: form.control, name: "ground" });

  const mutation = useMutation({
    mutationFn: (team: TeamType) => {
      return axios.patch(
        `http://localhost:5000/api/v1/teams/${team._id}/info`, {
          _id: team._id,
          name: team.name,
          parent: team.parent,
          ground: team.ground,
          abbr: team.abbr
        })
    },
    onSuccess: (data, variables, context) => {
      toast({
        title: "Team updated"
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
          <div className="flex gap-2 pb-3">
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="parent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="abbr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abbr</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
              <p className="font-semibold">Grounds</p>
              <Button type="button" onClick={() => append("")}>
                <IoAdd />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-end">
                  <FormField
                    control={form.control}
                    name={`ground[${index}]`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={() => remove(index)}>
                    <IoClose />
                  </Button>
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
  )
}