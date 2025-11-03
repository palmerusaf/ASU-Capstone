import { addTrackedJob } from '../storage/trackedJobs';
import { db } from './db';
import { jobStatusHistoryTable, jobTable } from './schema';

export async function saveJobData(jobData: typeof jobTable.$inferInsert) {
  try {
    const insertedJob = await db
      .insert(jobTable)
      .values(jobData)
      .returning({ id: jobTable.id });
    const jobId = insertedJob[0].id;
    // Keep track of initial status.
    await db.insert(jobStatusHistoryTable).values({
      jobId,
      status: jobData.status ?? 'recently added',
    });
    await addTrackedJob(`${jobData.jobIdFromSite}`); // Store id locally as well.
    return true;
  } catch (error) {
    return false;
  }
}
