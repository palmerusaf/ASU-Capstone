import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const jobSites = ['handshake'] as const;

const jobStatus = [
  'applied',
  'ghosted',
  'interested',
  'not interested',
  'rejected',
  'scheduled interview',
  'search result',
] as const;

export const jobs = sqliteTable('jobs', {
  id: int('id').primaryKey({ autoIncrement: true }),
  closeOutDate: int('closeOutDate', { mode: 'timestamp' }).notNull(),
  lastUpdated: int('lastUpdated', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  companyLogoUrl: text('companyLogoUrl').default(''),
  companyName: text('companyName').notNull(),
  description: text('description').notNull(),
  easyApply: int('easyApply', { mode: 'boolean' }).notNull(),
  remote: int('remote', { mode: 'boolean' }).notNull().default(false),
  jobId: int('jobId').notNull(),
  jobSite: text('jobSite', { enum: jobSites }).notNull(),
  positionTitle: text('positionTitle').notNull(),
  location: text('location').notNull(),
  postLink: text('postLink').notNull(),
  status: text('status', { enum: jobStatus }).notNull(),
});
