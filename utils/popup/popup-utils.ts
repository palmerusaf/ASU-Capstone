export function getJobId(url: string): Number | null {
  if (!url.includes('job')) return null;
  return 1;
}
