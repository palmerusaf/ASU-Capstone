import {
    boolean,
    integer,
    pgTable,
    text,
    timestamp,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';

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

type Status = (typeof jobStatus)[keyof typeof jobStatus];

export const jobTable = pgTable('jobs', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
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
  jobId: text('job_id').unique(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  //in USD cents
  payrate: integer('pay_rate'),
  link: text('link').notNull(),
  status: text('status')
    .$type<(typeof jobStatus)[number]>()
    .notNull()
    .default('recently added'),
});

export type HandshakeJobDataType = typeof jobTable.$inferSelect;


// Manual Add Job
export const addJobFormSchema = z.object({
  companyName: z.string().min(1, 'Company Name Required'),
  link: z.string().url('Invalid URL'), // Posting URL
  companyLogoUrl: z.string().url('Invalid URL').optional(),
  title: z.string().min(1, 'Job Title Required'), // Job Title
  description: z.string().min(1, 'Job Description Required'), // Job Description
  intern: z.boolean(),
  location: z.string().min(1, 'Job Location Required'),
  remote: z.boolean(),
  employmentType: z.enum(employmentTypeList),
  payRate: z.number().int().optional(), // PayRate, in cents
  status: z.enum(jobStatus), // Application status
}); 


// Resume:
const emptyToUndefined = (val: unknown) =>
  typeof val === 'string' && val.trim() === '' ? undefined : val; // Helper method to turn empty fields into undefined (to pass validation)

export const ResumeSchema = z.object({
  basics: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    label: z.string().min(1, { message: 'Professional title is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    website: z.string().url({ message: 'Invalid website URL' }).optional(),
    summary: z.string().optional(),
    profiles: z
      .array(
        z.object({
          network: z.string(),
          username: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
  }),
  education: z.array(
    z.object({
      institution: z.string().min(1, { message: 'Institution is required' }),
      area: z.string().min(1, { message: 'Field of study is required' }),
      startDate: z.string().min(1, { message: 'Start date is required' }),
      endDate: z.string().optional().transform(emptyToUndefined),
    })
  ),
  work: z.array(
    z.object({
      company: z.string().min(1, { message: 'Company name is required' }),
      position: z.string().min(1, { message: 'Position is required' }),
      startDate: z.string().min(1, { message: 'Start date is required' }),
      endDate: z.string().optional().transform(emptyToUndefined),
      summary: z.string().optional(),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string().min(1, { message: 'Project name is required' }),
      startDate: z.string().optional().transform(emptyToUndefined),
      endDate: z.string().optional().transform(emptyToUndefined),
      description: z.string().min(1, { message: 'Description is required' }),
      url: z.string().url({ message: 'Invalid website URL' }),
    })
  ),
});

export const testSchema = pgTable('testSchema', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  testField: text('test_field').notNull(),
});
