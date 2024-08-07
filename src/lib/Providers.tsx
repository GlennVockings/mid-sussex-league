"use client"

import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export const Provider = ({ children } : {children: ReactNode }) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      { children }
    </QueryClientProvider>
  )
}