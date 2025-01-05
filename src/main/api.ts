import 'dotenv/config'
import z from 'zod'
import { drizzle } from 'drizzle-orm/libsql'
import { usersTable } from '../db/schema'
import { initTRPC } from '@trpc/server'
import dbPath from '../../resources/local.db?asset&asarUnpack'

const db = drizzle('file:' + dbPath)

const t = initTRPC.create({ isServer: true })

export const router = t.router({
  greeting: t.procedure.query(async () => {
    // await db.insert(usersTable).values({ name: 'foo' }).onConflictDoNothing()
    const res = await db.select().from(usersTable)
    return res
  })
})

export type AppRouter = typeof router
