import 'dotenv/config'
import z from 'zod'
import { initTRPC } from '@trpc/server'
import { shell } from 'electron'
import * as handshakeUtils from './handshake'
import { db } from './db'
import { connect } from '../db/schema'
import { eq } from 'drizzle-orm'

const t = initTRPC.create({ isServer: true })

export const router = t.router({
  connect: t.router({
    getList: t.procedure.query(async () => {
      const res = await db.select().from(connect)
      if (res.length) return res.map(({ name }) => name)
      return []
    }),
    handshake: t.router({
      openLogin: t.procedure.input(z.void()).mutation(() => {
        shell.openExternal('https://asu.joinhandshake.com/login')
      }),
      test: t.procedure.input(z.void()).mutation(async () => {
        const res = await handshakeUtils.test()
        if (res) {
          await db.insert(connect).values({ name: 'handshake' }).onConflictDoNothing()
        } else {
          await db.delete(connect).where(eq(connect.name, 'handshake'))
        }
        return res
      })
    })
  }),
  jobs: t.router({
    search: t.router({
      new: t.procedure.input(z.string()).mutation(async ({ input }) => {
        const fakeJobs = genFakeJobs()
        db.insert(tb.jobs).values(fakeJobs)
      }),
      results: t.procedure.query(async () => {
        const res = await db.select().from(tb.jobs).where(eq(tb.jobs.status, 'search result'))
        return res
      })
    })
  }),
  resumes: t.router({
    hasCurrent: t.procedure.query(async () => {
      return false
    })
  })
})

export type AppRouter = typeof router

function genFakeJobs(numOfJobs = 20): (typeof tb.jobs.$inferSelect)[] {
  const res: (typeof tb.jobs.$inferSelect)[] = []
  for (let i = 0; i < numOfJobs; i++) {
    const job: typeof tb.jobs.$inferSelect = {
      id: 0,
      closeOutDate: Date.now(),
      lastUpdated: Date.now(),
      companyLogoUrl: null,
      companyName: '',
      description: '',
      easyApply: false,
      jobId: 0,
      jobSite: 'handshake',
      positionTitle: '',
      postLink: '',
      status: 'applied'
    }
    res.push(job)
  }
  return res
}
