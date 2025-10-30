import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { db } from '@/utils/db/db';
import { JobSelectType, jobTable, rawResumes } from '@/utils/db/schema';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eq } from 'drizzle-orm';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

export function ResumeMatchesModal({ jobData }: { jobData: JobSelectType }) {
    const { resumeId, description } = jobData;
    const qc = useQueryClient();
    const { data, isPending } = useQuery({
        queryKey: ['savedJobs', { resumeId, description }],
        queryFn: getData,
    });
    if (isPending) return <Loader2 className='mr-2 h-4 w-4 animate-spin' />;

    return (
        <Dialog key={jobData.id}>
            <DialogTrigger>
                <div className="p-3 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 py-1">
                    Link
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Link Resume to Job</DialogTitle>
                    <DialogDescription>
                        {!data?.length ? 'No uploaded Resumes' : <List />}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );

    function List() {
        return (
            <>
                <div className='grid grid-cols-3 gap-2'>
                    <span className='font-bold text-xl'>Resume</span>
                    <span className='font-bold text-xl'>Match Rate</span>
                    <span></span>
                </div>
                <div className='grid grid-cols-3 gap-2  overflow-y-auto max-h-72'>
                    {data?.map(({ name, jsonId }) => {
                        return (
                            <>
                                <span className=''>{name}</span>
                                <span className=''>89</span>
                                {jsonId === resumeId ? (
                                    <Button disabled>Linked</Button>
                                ) : (
                                    <AsyncButton
                                        loadingText='Linking...'
                                        onClickAsync={async () => {
                                            await db
                                                .update(jobTable)
                                                .set({ resumeId: jsonId })
                                                .where(eq(jobTable.id, jobData.id));
                                            await qc.invalidateQueries({ queryKey: ['savedJobs'] });
                                        }}
                                    >
                                        Link
                                    </AsyncButton>
                                )}
                            </>
                        );
                    })}
                </div>
            </>
        );
    }
    async function getData() {
        return await db.select().from(rawResumes);
    }
}
