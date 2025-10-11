import {
  boolean,
  integer, jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { relations } from 'drizzle-orm';

export const jobStatus = [
  'search result',
  'recently added',
  'interested',
  'applied',
  'scheduled interview',
  'ghosted',
  'rejected',
  'not interested',
] as const;

export const jobStatusEmojis = {
  applied: '📨', // sent application
  ghosted: '👻', // no reply
  interested: '⭐', // marked as interested
  'not interested': '👎', // declined / passed
  rejected: '❌', // got rejected
  'scheduled interview': '📅', // upcoming interview
  'search result': '🔍', // found in search
  'recently added': '🆕', // new job entry
} as const;

export const employmentTypeList = [
  'Full-Time',
  'Part-Time',
  'Temporary',
  'Seasonal',
  'Contractor',
] as const;

export const payTypeList = [
    'Hourly Wage',
    'Annual Salary',
    'Monthly Stipend', 
] as const;

type Status = (typeof jobStatus)[keyof typeof jobStatus];

export const jobTable = pgTable('jobs', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  archived: boolean('archived').default(false).notNull(),
  datePosted: timestamp('date_posted'),
  closeOutDate: timestamp('close_out_date'),
  statusChangeDate: timestamp('status_change_date').notNull().defaultNow(),
  intern: boolean('intern').notNull(),
  companyLogoUrl: text('company_logo_url').default(''),
  employmentType:
    text('employment_type').$type<(typeof employmentTypeList)[number]>(),
  companyName: text('company_name').notNull(),
  description: text('description').notNull(),
  remote: boolean('remote').notNull(),
  jobIdFromSite: text('job_id').unique(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  payrate: integer('pay_rate'), //in USD cents
  payType: text('pay_type').$type<(typeof payTypeList)[number]>(),
  link: text('link').notNull(),
  status: text('status')
    .$type<(typeof jobStatus)[number]>()
    .notNull()
    .default('recently added'),
});

export const jobCommentsTable = pgTable('job_comments', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  jobId: integer('job_id')
    .notNull()
    .references(() => jobTable.id, { onDelete: 'cascade' }),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type JobSelectType = typeof jobTable.$inferSelect;

// Manual Add Job
export type JobInsertType = typeof jobTable.$inferInsert;
export const addJobFormSchema: z.ZodType<JobInsertType> = z.object({
  link: z.string().url('Invalid URL'),
  intern: z.boolean(),
  companyName: z.string().min(1, 'Company Name Required'),
  description: z.string().min(1, 'Job Description Required'), // Job Description
  remote: z.boolean(),
  title: z.string().min(1, 'Job Title Required'), // Job Title
  location: z.string().min(1, 'Job Location Required'),
  companyLogoUrl: z.preprocess(
    // When field is empty, val == ''. Z does not recognize '' as empty therefore optional won't work.
    // Solution is to convert '' to undefined first.
    (val) => (val === '' ? undefined : val),
    z.string().url('Invalid URL').optional()
  ) as z.ZodType<string | undefined>,
  employmentType: z.enum(employmentTypeList),
  payrate: z.number().int().optional(), // PayRate, in cents
  payType: z.enum(payTypeList),
  status: z.enum(jobStatus), // Application status
});

// Resume:
const emptyToUndefined = (val: unknown) =>
  typeof val === 'string' && val.trim() === '' ? undefined : val; // Helper method to turn empty fields into undefined (to pass validation)

export const resumes = pgTable('resumes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: text('user_id'),              // optional owner identifier
  name: text('name').notNull(),         // user-chosen label for the saved resume
  json: jsonb('json').notNull(),        // full JSON Resume payload
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rawResumes = pgTable('raw_resumes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  rawText: text('raw_text').notNull(),
  source: text('source').notNull(),     // "builder" | "paste"
  jsonId: integer('json_id').references(() => resumes.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const resumesRelations = relations(resumes, ({ many }) => ({
  rawResumes: many(rawResumes),
}));

export const testSchema = pgTable('testSchema', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  testField: text('test_field').notNull(),
});
