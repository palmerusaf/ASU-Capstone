import 'dotenv/config'
import { faker } from '@faker-js/faker'
import z from 'zod'
import { initTRPC } from '@trpc/server'
import { shell } from 'electron'
import * as handshakeUtils from './handshake'
import { db } from './db'
import * as tb from '../db/schema'
import { eq } from 'drizzle-orm'

const t = initTRPC.create({ isServer: true })

export const router = t.router({
  connect: t.router({
    getList: t.procedure.query(async () => {
      const res = await db.select().from(tb.connect)
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
          await db.insert(tb.connect).values({ name: 'handshake' }).onConflictDoNothing()
        } else {
          await db.delete(tb.connect).where(eq(tb.connect.name, 'handshake'))
        }
        return res
      })
    })
  }),
  jobs: t.router({
    search: t.router({
      new: t.procedure.input(z.string()).mutation(async ({ input }) => {
        const fakeJobs = genFakeJobs()
        await db.insert(tb.jobs).values(fakeJobs)
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

function genFakeJobs(numOfJobs = 25): (typeof tb.jobs.$inferInsert)[] {
  const res: (typeof tb.jobs.$inferInsert)[] = []
  for (let i = 0; i < numOfJobs; i++) {
    const job: typeof tb.jobs.$inferInsert = {
      closeOutDate: faker.date.future(),
      companyName: faker.company.name(),
      description: faker.lorem.paragraphs({ min: 7, max: 12 }),
      easyApply: faker.helpers.arrayElement([true, false]),
      remote: faker.helpers.arrayElement([true, false]),
      jobSite: 'handshake',
      positionTitle: faker.person.jobTitle(),
      postLink: faker.internet.url(),
      companyLogoUrl: faker.image.url(),
      location: `${faker.location.city()}, ${faker.location.state()}`,
      jobId: faker.number.int(),
      status: 'search result'
    }
    res.push(job)
  }
  return res
}
