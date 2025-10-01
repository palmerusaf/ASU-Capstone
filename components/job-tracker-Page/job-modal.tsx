import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import DOMPurify from 'dompurify';
import { jobStatusEmojis, jobTable } from '@/utils/db/schema';
import { db } from '@/utils/db/db';
import { eq } from 'drizzle-orm';
import { useQueryClient } from '@tanstack/react-query';

function SafeHTML({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return (
    <div
      className='prose max-w-none'
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

export function JobModal({ data }: { data: typeof jobTable.$inferSelect }) {
  const qclient = useQueryClient();
  return (
    <Dialog>
      <DialogTrigger className='cursor-pointer'>
        <Button>View Details</Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          <div>
            <Label>Title</Label>
            <p>{data.title}</p>
          </div>

          <div>
            <Label>Company</Label>
            <p>{data.companyName}</p>
          </div>

          <div className='md:col-span-2'>
            <Label>Description</Label>
            <div className='max-h-60 overflow-y-auto border  rounded p-2'>
              <SafeHTML html={data.description} />
            </div>
          </div>

          <div>
            <Label>Employment Type</Label>
            <p>{data.employmentType}</p>
          </div>

          <div>
            <Label>Location</Label>
            <p>{data.location}</p>
          </div>

          <div>
            <Label>Payrate</Label>
            <p>
              {data.payrate
                ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(data.payrate / 100)
                : 'n/a'}
            </p>
          </div>

          <div>
            <Label>Remote</Label>
            <p>{data.remote ? 'Yes' : 'No'}</p>
          </div>

          <div>
            <Label>Status</Label>
            <p className='capitalize'>
              {jobStatusEmojis[data.status]} {data.status}
            </p>
          </div>
          <div className='md:col-span-2'>
            <a
              href={data.link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline'
            >
              <Label>Link</Label>
            </a>
          </div>
        </div>

        <DialogFooter className='mt-6'>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
