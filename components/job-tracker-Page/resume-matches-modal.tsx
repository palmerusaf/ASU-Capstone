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

export function ResumeMatchesModal({ data }: { data: typeof jobTable.$inferSelect }) {
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
        <button className='text-blue-600 underline'>View Matches</button>
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
