export type JsonResume = {
  basics: {
    name?: string;
    label?: string;
    email?: string;
    phone?: string;
    website?: string;
    summary?: string;
    profiles?: { network?: string; username?: string; url?: string }[];
  };
  work?: { company?: string; position?: string; startDate?: string; endDate?: string; summary?: string }[];
  education?: { institution?: string; area?: string; startDate?: string; endDate?: string }[];
  projects?: { name?: string; description?: string; url?: string; startDate?: string; endDate?: string }[];
};

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(\+?\d[\d\s().-]{8,}\d)/;

export function textToJsonResume(raw: string): JsonResume {
  const text = raw?.trim() ?? "";
  const email = text.match(EMAIL_RE)?.[0];
  const phone = text.match(PHONE_RE)?.[0];

  // very naive “name” guess: first non-empty line if it looks like a name
  const firstLine = text.split(/\r?\n/).map(s => s.trim()).find(Boolean) || "";
  const nameLooksLike = /^[A-Za-z][A-Za-z .'-]{2,}$/.test(firstLine) ? firstLine : undefined;

  // shove everything into a readable summary for now
  const summary = text.length > 200 ? text.slice(0, 5000) : text;

  return {
    basics: {
      name: nameLooksLike,
      label: "Candidate",
      email,
      phone,
      website: undefined,
      summary,
      profiles: [],
    },
    // keep optional sections empty for now
    work: [],
    education: [],
    projects: [],
  };
}