import { ResumeSchema } from '@/utils/db/schema.ts';
import { JsonResume } from '@/utils/textToJsonResume.ts';
import { z } from 'zod';

z.infer<typeof ResumeSchema>

export function concatResumeFields(j: JsonResume): string {
  const parts: string[] = [];
  const b = j?.basics ?? {};
  if (b.name) parts.push(b.name);
  if (b.label) parts.push(b.label);
  if (b.email) parts.push(b.email);
  if (b.phone) parts.push(b.phone);
  if (b.website) parts.push(b.website);
  if (b.summary) parts.push(b.summary);

  const edu = Array.isArray(j?.education) ? j.education : [];
  for (const e of edu) {
    parts.push(
      ["Education:", e.institution, e.area, e.startDate, e.endDate].filter(Boolean).join(" ")
    );
  }

  const work = Array.isArray(j?.work) ? j.work : [];
  for (const w of work) {
    parts.push(
      ["Work:", w.company, w.position, w.startDate, w.endDate, w.summary].filter(Boolean).join(" ")
    );
  }

  const projects = Array.isArray(j?.projects) ? j.projects : [];
  for (const p of projects) {
    parts.push(
      ["Project:", p.name, p.url, p.startDate, p.endDate, p.description].filter(Boolean).join(" ")
    );
  }

  return parts.filter(Boolean).join("\n");
}