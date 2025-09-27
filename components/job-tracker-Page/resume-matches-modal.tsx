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
import { jobTable } from '@/utils/db/schema';
import { getResumes } from '@/utils/db/localStorage';
import { useState, useEffect } from 'react';
import { jsonToText } from '@/utils/jsonToText';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function ResumeMatchesModal({
  data,
}: {
  data: typeof jobTable.$inferSelect;
}) {
  const [resumes, setResumes] = useState<{ text: string; score: number }[]>([]);

  useEffect(() => {
    async function loadResumes() {
      const storedResumes = (await getResumes()) as any[];
      const scored = storedResumes.map((resume: any) => {
        const text = jsonToText(resume);
        return {
          ...resume,
          score: calculateCosineSimilarity(data.description, text),
        };
      });
      //  Following code sorts resumes based on similairy score. It can be used once resumes have a unique identifier.
      //   scored.sort((a, b) => b.score - a.score);
      setResumes(scored);
    }
    loadResumes();
  }, [data.description]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-3 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 py-1">
          Matches
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resume Matches</DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resume</TableHead>
              <TableHead>Similarity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumes.map((resume, i) => (
              <TableRow key={i}>
                {/* TODO: Replace Resume{i+1} with actual resume identifier when we make one*/}
                <TableCell>Resume {i + 1}</TableCell>
                <TableCell>{resume.score.toFixed(3)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
