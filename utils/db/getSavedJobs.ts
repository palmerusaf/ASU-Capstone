import { db } from './db';
import { JobSelectType, jobTable } from './schema';
import { eq } from 'drizzle-orm';

export async function getSavedJobs(): Promise<JobSelectType[]> {
  const jobs = await db
    .select()
    .from(jobTable)
    .where(eq(jobTable.archived, false));
  return jobs;
}
