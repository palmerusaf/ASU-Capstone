import React, { useState } from 'react'
import { ipcLink } from 'electron-trpc/renderer'
import { createTRPCReact } from '@trpc/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppRouter } from '../../main/api'
import { Provider as ChakraProvider } from '@renderer/chakra-components/ui/provider'

export const api = createTRPCReact<AppRouter>()
export function WithProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [ipcLink()]
    })
  )
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>{children}</ChakraProvider>
      </QueryClientProvider>
    </api.Provider>
  )
}
