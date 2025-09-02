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
  return (
    <Dialog>
      <DialogTrigger className='cursor-pointer'>
        <div className="p-3 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 py-1">
          View
        </div>
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
