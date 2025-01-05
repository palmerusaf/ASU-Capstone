import 'dotenv/config'
import z from 'zod'
import { EventEmitter } from 'events'
import { drizzle } from 'drizzle-orm/libsql'
import { usersTable } from '../db/schema'
import { initTRPC } from '@trpc/server'
import { observable } from '@trpc/server/observable'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

const db = drizzle(
  'file:' +
    join(
      __dirname,
      is.dev ? '../../resources/' : '../../../app.asar.unpacked/resources/',
      './data.db'
    )
)
const ee = new EventEmitter()

const t = initTRPC.create({ isServer: true })

export const router = t.router({
  greeting: t.procedure.input(z.object({ name: z.string() })).query(async (req) => {
    const { input } = req

    ee.emit('greeting', `Greeted ${input.name}`)
    await db.insert(usersTable).values({ name: 'foo' }).onConflictDoNothing()
    const res = await db.select().from(usersTable)
    return res
  }),
  subscription: t.procedure.subscription(() => {
    return observable((emit) => {
      function onGreet(text: string) {
        emit.next({ text })
      }

      ee.on('greeting', onGreet)

      return () => {
        ee.off('greeting', onGreet)
      }
    })
  })
})

export type AppRouter = typeof router
