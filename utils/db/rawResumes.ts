export type RawResume = {
  id: string;
  name: string;               // name
  rawText: string;            // raw text
  source: "builder" | "paste";
  createdAt: number;          // Date.now()
  // TO-DO: Link id once moved to DB
  jsonId?: string | null;
};

const KEY = "raw:resumes";

function readAll(): RawResume[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}
function writeAll(rows: RawResume[]) {
  localStorage.setItem(KEY, JSON.stringify(rows));
}

export function addRawResume(input: Omit<RawResume, "id" | "createdAt">): string {
  const rows = readAll();
  const id = crypto.randomUUID();
  rows.push({ ...input, id, createdAt: Date.now() });
  writeAll(rows);
  return id;
}

export function listRawResumes(): RawResume[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}