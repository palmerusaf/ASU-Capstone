import { db } from '@/utils/db/db';
import { resumes } from '@/utils/db/schema';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

export function DeleteResumePage() {
  const { data, isPending } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => await db.select().from(resumes),
  });
  const qc = useQueryClient();

  if (isPending)
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-xl text-slate-500 animate-pulse'>Loading...</div>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-xl text-slate-500'>No Data available</div>
      </div>
    );

  return (
    <div className='max-h-full pb-6'>
      <div className='mx-auto overflow-y-auto max-w-2xl gap-2 grid grid-cols-2'>
        <span className='text-xl font-bold'>Resume Name</span>
        <span></span>
        {data.map(({ id, name }) => {
          return (
            <>
              <span className='text-lg my-auto'>{name}</span>
              <AsyncButton
                variant={'destructive'}
                onClickAsync={async () => {
                  await db.delete(resumes).where(eq(resumes.id, id));
                  await qc.invalidateQueries({
                    queryKey: ['savedJobs'],
                    exact: false,
                  });
                  await qc.invalidateQueries({
                    queryKey: ['resumes'],
                  });
                }}
              >
                Delete
              </AsyncButton>
            </>
          );
        })}
      </div>
    </div>
  );
}
