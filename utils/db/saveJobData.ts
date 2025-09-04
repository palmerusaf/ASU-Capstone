import { db } from "./db";
import { jobTable } from "./schema";

export async function saveJobData(jobData: typeof jobTable.$inferInsert) {
  try {
    await db.insert(jobTable).values(jobData);
    return true;
  } catch (error) {
    return false;
  }
}