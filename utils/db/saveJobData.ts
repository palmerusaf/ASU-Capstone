import { addTrackedJob } from "../storage/trackedJobs";
import { db } from "./db";
import { jobTable } from "./schema";

export async function saveJobData(jobData: typeof jobTable.$inferInsert) {
  try {
    await db.insert(jobTable).values(jobData);
    await addTrackedJob(`${jobData.jobIdFromSite}`); // Store id locally as well.
    return true;
  } catch (error) {
    return false;
  }
}