export function getJobId(url: string): number | null {
  const segments = new URL(url).pathname.split('/').filter(Boolean);
  if (
    segments.length === 2 &&
    (segments[0] === 'job-search' || segments[0] === 'jobs')
  ) {
    const id = parseInt(segments[1], 10);
    return isNaN(id) ? null : id;
  }
  return null;
}
