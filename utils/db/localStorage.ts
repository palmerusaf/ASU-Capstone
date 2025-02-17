import { storage } from "wxt/storage";
import { jobs } from "./schema";

export async function getJobs() {
  return (await storage.getItem("local:jobs")) as (typeof jobs.$inferSelect)[];
}

export async function addJob(job: typeof jobs.$inferSelect) {
  await storage.setItem("local:jobs", [...(await getJobs()), job]);
}
