import { db } from '@/utils/db/db';
import { appliedJobsTable, jobTable } from '@/utils/db/schema';
import { useQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';
import Plot from 'react-plotly.js';

export function TotalJobs() {
  const { data } = useQuery({
    queryKey: ['totJobs'],
    queryFn: getSanKeyJobData,
  });

  if (!data) return null;

  const { numJobs, numApps, numUnApps, appBreakout, unAppBreakout } = data;

  // Build Sankey data dynamically
  const nodes: string[] = ['Total Jobs', 'Applied Jobs', 'Unapplied Jobs'];
  const links: { source: number; target: number; value: number }[] = [];

  // Applied Jobs breakdown
  for (const [status, count] of Object.entries(appBreakout)) {
    nodes.push(status);
    links.push({
      source: nodes.indexOf('Applied Jobs'),
      target: nodes.indexOf(status),
      value: count,
    });
  }

  // Unapplied Jobs breakdown
  for (const [status, count] of Object.entries(unAppBreakout)) {
    nodes.push(status);
    links.push({
      source: nodes.indexOf('Unapplied Jobs'),
      target: nodes.indexOf(status),
      value: count,
    });
  }

  // Link root node to applied/unapplied
  links.unshift(
    {
      source: nodes.indexOf('Total Jobs'),
      target: nodes.indexOf('Applied Jobs'),
      value: numApps,
    },
    {
      source: nodes.indexOf('Total Jobs'),
      target: nodes.indexOf('Unapplied Jobs'),
      value: numUnApps,
    }
  );

  return (
    <Plot
      data={[
        {
          type: 'sankey',
          orientation: 'h',
          node: {
            pad: 15,
            thickness: 20,
            line: { color: 'gray', width: 0.5 },
            label: nodes,
          },
          link: {
            source: links.map((l) => l.source),
            target: links.map((l) => l.target),
            value: links.map((l) => l.value),
          },
        },
      ]}
      layout={{
        title: `Job Tracker Overview (${numJobs} total jobs)`,
        font: { size: 14 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        autosize: true,
      }}
      config={{ displayModeBar: false, responsive: true }}
    />
  );
}

async function getSanKeyJobData() {
  const appliedJobs = await db
    .select()
    .from(jobTable)
    .innerJoin(appliedJobsTable, eq(appliedJobsTable.jobId, jobTable.id));

  const allJobs = await db.select().from(jobTable);

  const unappliedJobs = allJobs.filter(({ id }) => {
    for (const { jobs } of appliedJobs) {
      if (jobs.id === id) return false;
    }
    return true;
  });

  const numJobs = allJobs.length;
  const numApps = appliedJobs.length;
  const numUnApps = unappliedJobs.length;

  // Break down by status
  const appBreakout = appliedJobs.reduce(
    (res, { jobs: { status } }) => {
      res[status] = (res[status] ?? 0) + 1;
      return res;
    },
    {} as Record<string, number>
  );

  const unAppBreakout = unappliedJobs.reduce(
    (res, { status }) => {
      res[status] = (res[status] ?? 0) + 1;
      return res;
    },
    {} as Record<string, number>
  );

  return { numJobs, numApps, numUnApps, appBreakout, unAppBreakout };
}
