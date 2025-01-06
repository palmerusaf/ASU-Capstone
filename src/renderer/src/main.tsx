import './assets/main.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ipcLink } from 'electron-trpc/renderer'
import { createTRPCReact } from '@trpc/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppRouter } from '../../main/api'

export const api = createTRPCReact<AppRouter>()

function AppWithProviders() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [ipcLink()]
    })
  )
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </api.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
)
