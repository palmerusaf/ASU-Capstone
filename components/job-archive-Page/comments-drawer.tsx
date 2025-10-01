import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { jobCommentsTable } from '@/utils/db/schema';
import { Button } from '../ui/button';
import { db } from '@/utils/db/db';
import { useQuery } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

export function CommentsDrawer({ id }: { id: number }) {
  const { data } = useQuery({
    queryKey: ['jobcomments', id],
    queryFn: () =>
      db.select().from(jobCommentsTable).where(eq(jobCommentsTable.jobId, id)),
  });
  return (
    <Sheet>
      <SheetTrigger>
        <Button className='w-full'>Comments</Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='text-xl'>Comments</SheetTitle>
          <div className='grid gap-3'>
            {(data?.length &&
              data?.map((el) => <ShowComment key={el.id} data={el} />)) ||
              'No Comments'}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function ShowComment({
  data: { comment, createdAt, updatedAt },
}: {
  data: typeof jobCommentsTable.$inferSelect;
}) {
  return (
    <div className='flex flex-col'>
      <div className='text-lg'>{comment}</div>
      <div className='ml-auto'>Created: {createdAt.toLocaleString()}</div>
      {createdAt.valueOf() !== updatedAt.valueOf() && (
        <div className='ml-auto'>Modified: {updatedAt.toLocaleString()}</div>
      )}
    </div>
  );
}
