import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';

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

export type HandshakeJobDataType = {
    // Posting
    postingId: number;
    postingUrl: string;
    externalApplyUrl?: string; 

    // Job
    jobType?: string;          // e.g., Internship, Full-Time
    employmentType?: string;   // e.g., Full-time, Part-time
    title?: string;
    description?: string;

    // Company
    company?: string;
    companyWebsite?: string;    
    companyLogoUrl?: string;    

    // Pay
    payRate?: string;          // e.g., $42,411.00 Per year.
    currency?: string;         // e.g., USD, EUR

    // location
    city?: string;
    country?: string;
};

// Resume:
const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val; // Helper method to turn empty fields into undefined (to pass validation)

export const ResumeSchema = z.object({
  basics: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    label: z.string().min(1, { message: "Professional title is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    website: z.string().url({ message: "Invalid website URL" }).optional(),
    summary: z.string().optional(),
  }),
  education: z.array( // Set as array (along w/work & education) for future expansion
    z.object({
      institution: z.string().min(1, { message: "Institution is required" }),
      degree: z.string().min(1, { message: "Degree is required" }),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z
        .string()
        .optional()
        .transform(emptyToUndefined),
    })
  ),
  work: z.array(
    z.object({
      name: z.string().min(1, { message: "Company name is required" }),
      position: z.string().min(1, { message: "Position is required" }),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z
        .string()
        .optional()
        .transform(emptyToUndefined),
      summary: z.string().optional(),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string().min(1, { message: "Project name is required" }),
      startDate: z
        .string()
        .optional()
        .transform(emptyToUndefined),
      endDate: z
        .string()
        .optional()
        .transform(emptyToUndefined),
      description: z.string().optional(),
      url: z.string().url({ message: "Invalid website URL" }).optional(),
    })
  ),
});