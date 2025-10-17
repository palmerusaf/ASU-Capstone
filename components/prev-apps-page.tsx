import { db } from '@/utils/db/db';
import { jobEventsTable, jobTable } from '@/utils/db/schema';
import { useQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

export function PrevAppsPage() {
  const { data } = useQuery({
    queryKey: ['prevApp'],
    queryFn: () =>
      db
        .select()
        .from(jobEventsTable)
        .where(eq(jobEventsTable.eventType, 'applied'))
        .fullJoin(jobTable, eq(jobTable.id, jobEventsTable.jobId)),
  });
  const companies = new Set(data?.map((val) => val.jobs?.companyName));
  // __AUTO_GENERATED_PRINT_VAR_START__
  console.log('PrevAppsPage companies:', companies); // __AUTO_GENERATED_PRINT_VAR_END__
  return 'prev app page';
}
