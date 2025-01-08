import 'dotenv/config'
import z from 'zod'
import { initTRPC } from '@trpc/server'
import { shell } from 'electron'
import * as handshakeUtils from './handshake'

const t = initTRPC.create({ isServer: true })

export const router = t.router({
  connect: t.router({
    handshake: t.router({
      openLogin: t.procedure.input(z.void()).mutation(() => {
        shell.openExternal('https://asu.joinhandshake.com/login')
      }),
      test: t.procedure.input(z.void()).mutation(async () => {
        const res = await handshakeUtils.test()
        return res
      })
    })
  })
})

export type AppRouter = typeof router
