import { db } from './db';
import { JobHistoryType, jobStatusHistoryTable } from './schema';
import { eq, sql } from 'drizzle-orm';

// Get status history of all jobs
export async function getAllJobStatusHistory(): Promise<JobHistoryType[]> {
  const histories = await db.select().from(jobStatusHistoryTable);
  return histories;
}

// Get status history of specific job
export async function getJobHistory(jobId: number): Promise<JobHistoryType[]> {
  const jobHistory = db
    .select()
    .from(jobStatusHistoryTable)
    .where(eq(jobStatusHistoryTable.jobId, jobId));

  return jobHistory;
}

export async function getStreamgraphData() {
  const query = sql`
    WITH all_change_times AS (
      SELECT DISTINCT changed_at as bucket_date
      FROM ${jobStatusHistoryTable}
      ORDER BY changed_at
    ),
    all_jobs AS (
      SELECT DISTINCT job_id FROM ${jobStatusHistoryTable}
    ),
    latest_status_per_job AS (
      SELECT DISTINCT ON (act.bucket_date, aj.job_id)
        act.bucket_date,
        aj.job_id,
        jsh.status
      FROM all_change_times act
      CROSS JOIN all_jobs aj
      LEFT JOIN ${jobStatusHistoryTable} jsh 
        ON jsh.job_id = aj.job_id 
        AND jsh.changed_at <= act.bucket_date
      WHERE jsh.status IS NOT NULL
      ORDER BY act.bucket_date, aj.job_id, jsh.changed_at DESC, jsh.id DESC
    )
    SELECT 
      bucket_date as date,
      status,
      COUNT(*) as count
    FROM latest_status_per_job
    GROUP BY bucket_date, status
    ORDER BY bucket_date, status
  `;

  const result = await db.execute(query);

  // Transform to streamgraph format
  const byDate = new Map<string, Record<string, number>>();

  for (const row of result.rows as Array<{
    date: Date;
    status: string;
    count: string;
  }>) {
    const dateKey = new Date(row.date).toISOString();
    if (!byDate.has(dateKey)) {
      byDate.set(dateKey, {});
    }
    byDate.get(dateKey)![row.status] = parseInt(row.count);
  }

  return Array.from(byDate.entries())
    .map(([date, statuses]) => ({
      date,
      ...statuses,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
