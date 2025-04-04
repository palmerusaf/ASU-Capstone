import { storage } from 'wxt/storage';
import { jobs } from './schema';

export async function getJobs() {
  return (await storage.getItem('local:jobs')) as (typeof jobs.$inferSelect)[];
}

export async function addJob(job: typeof jobs.$inferSelect) {
  await storage.setItem('local:jobs', [...(await getJobs()), job]);
}

export async function getResumes() {
  return (await storage.getItem("local:resumes")) || [];
}

export async function addResume(resume: unknown) {
  const resumes = await getResumes();
  await storage.setItem("local:resumes", [...resumes, resume]);
}