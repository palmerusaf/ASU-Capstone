import './assets/main.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ipcLink } from 'electron-trpc/renderer'
import { createTRPCReact } from '@trpc/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppRouter } from '../../main/api'
import { Provider as ChakraProvider } from '@renderer/chakra-components/ui/provider'

function setDarkMode() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

setDarkMode()

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
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </api.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
)
