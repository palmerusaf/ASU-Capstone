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

export function CommentsDrawer({ id }: { id: number }) {
  return (
    <Sheet open={1}>
      <SheetTrigger>
        <Button>Comments</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-xl'>Comments</SheetTitle>
          <div>
            <NewComment />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function NewComment() {
  const FormSchema = z.object({
    comment: z.string().min(1, {
      message: 'Comment Blank',
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    db.insert(jobCommentsTable).values({ jobId: id, comment: data.comment });
    form.resetField('comment', { defaultValue: '' });
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
