const STORAGE_KEY = 'trackedJobs';

// Get all tracked jobs
export async function getTrackedJobs(): Promise<string[]> {
  const stored = await browser.storage.local.get(STORAGE_KEY);
  return stored[STORAGE_KEY] ?? [];
}

// Add jobID to tracked jobs list
export async function addTrackedJob(jobIdFromSite: string) {
  const tracked = await getTrackedJobs();
  if (!tracked.includes(jobIdFromSite)) {
    tracked.push(jobIdFromSite);
    await browser.storage.local.set({ [STORAGE_KEY]: tracked });
  }
}

// Remove a tracked job from list
export async function removeTrackedJob(jobIdFromSite: string) {
  const tracked = await getTrackedJobs();
  const updated = tracked.filter((id) => id !== jobIdFromSite);
  await browser.storage.local.set({ [STORAGE_KEY]: updated });
}
