import 'dotenv/config'
import z from 'zod'
import { posts } from '../db/schema'
import { initTRPC } from '@trpc/server'
import { db } from './db'


const t = initTRPC.create({ isServer: true })

export const router = t.router({
  getPosts: t.procedure.query(async () => {
    const res = await db.select().from(posts)
    return res
  }),
  setPosts: t.procedure.input(z.string()).mutation(async ({ input }) => {
    await db.insert(posts).values({ title: input })
  })
})

export type AppRouter = typeof router
