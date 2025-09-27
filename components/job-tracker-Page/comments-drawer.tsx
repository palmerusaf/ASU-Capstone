import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
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
import { Textarea } from '../ui/textarea';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';

export function CommentsDrawer({ id }: { id: number }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ['jobcomments', id],
    queryFn: () =>
      db.select().from(jobCommentsTable).where(eq(jobCommentsTable.jobId, id)),
  });
  return (
    <Sheet open={1}>
      <SheetTrigger>
        <Button>Comments</Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto'>
        <SheetHeader>
          <SheetTitle className='text-xl'>Comments</SheetTitle>
          <div className='grid gap-3'>
            {(data?.length && data?.map((el) => <ShowComment data={el} />)) ||
              'No Comments'}
            <NewComment />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );

  function NewComment() {
    const FormSchema = z.object({
      comment: z.string().min(1, {
        message: 'Comment Blank',
      }),
    });
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
      await db
        .insert(jobCommentsTable)
        .values({ jobId: id, comment: data.comment });
      form.resetField('comment', { defaultValue: '' });
      qc.invalidateQueries({ queryKey: ['jobcomments', id] });
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-3'>
          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder='New Comment' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Add</Button>
        </form>
      </Form>
    );
  }
}

function ShowComment({
  data: { comment, createdAt, id, jobId, updatedAt },
}: {
  data: typeof jobCommentsTable.$inferSelect;
}) {
  const [edit, setEdit] = useState(false);
  if (edit) return 'edit mode';

  return (
    <div className='flex flex-col'>
      <div className='text-lg'>{comment}</div>
      <div className='ml-auto'>Created: {createdAt.toLocaleString()}</div>
      {createdAt.valueOf() !== updatedAt.valueOf() && (
        <div className='ml-auto'>Modified: {updatedAt.toLocaleString()}</div>
      )}
      <Button variant={'outline'} size={'sm'} className='ml-auto'>
        Edit
      </Button>
    </div>
  );
}
