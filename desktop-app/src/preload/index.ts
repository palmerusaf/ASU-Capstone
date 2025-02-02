import { exposeElectronTRPC } from 'electron-trpc/main'

//load electron tRPC
process.once('loaded', async () => {
  exposeElectronTRPC()
})
