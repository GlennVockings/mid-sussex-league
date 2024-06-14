"use client"

import { TableType } from "@/lib/type"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"


const formSchema = z.object({
  table: z.array(z.object({
    _id: z.string(),
    team: z.object({
      _id: z.string(),
      name: z.string()
    }),
    played: z.number().int(),
    wins: z.number().int(),
    loses: z.number().int(),
    draws: z.number().int(),
    for: z.number().int(),
    against: z.number().int(),
    points: z.number().int()
  }))
})

export const AdminTable = ({ table, leagueId, seasonId } : { table: TableType[], leagueId: string, seasonId: string }) => {
  const [ editForm, setEditForm ] = useState(false)
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      table: table || []
    }
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: "table",
  })

  const mutation = useMutation({
    mutationFn: (table: TableType[]) => {
      const body = table;
      return axios.patch(`http://localhost:5000/api/v1/leagues/${leagueId}/${seasonId}/editTable`, body)
    },
    onSuccess: (data, variables, context) => {
      toast({
        title: "Table updated"
      })
    }
  })

  function onEditForm(e) {
    e.preventDefault();
    setEditForm(!editForm);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values.table)
    setEditForm(false)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {
            fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-8">
                <FormField 
                  control={form.control}
                  name={`table.${index}._id`}
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`table.${index}.team.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`table.${index}.played`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={!editForm} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`table.${index}.wins`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={!editForm} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`table.${index}.draws`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={!editForm} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`table.${index}.loses`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={!editForm} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`table.${index}.for`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={!editForm} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`table.${index}.against`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={!editForm} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name={`table.${index}.points`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={!editForm} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))
          }
          <div className="flex gap-3 p-4">
            <Button onClick={(e) => onEditForm(e)}>Edit</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}