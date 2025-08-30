import { execSync } from 'child_process';
import {
  rmSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
} from 'fs';
import { join } from 'path';

// Paths
const drizzleDir = join(process.cwd(), 'drizzle');
const outputFile = join(process.cwd(), 'utils/db/createTbleSqlRaw.ts');

// 1. Remove old drizzle folder
try {
  rmSync(drizzleDir, { recursive: true, force: true });
  console.log('Removed old drizzle directory.');
} catch (err) {
  console.warn('Could not remove drizzle directory:', err);
}

// 2. Run drizzle-kit generate
execSync(
  `pnpm drizzle-kit generate --dialect=postgresql --schema=./utils/db/schema.ts`,
  { stdio: 'inherit' }
);

// 3. Collect all .sql files
const sqlFiles = readdirSync(drizzleDir).filter((f) => f.endsWith('.sql'));
if (sqlFiles.length === 0) {
  console.error('No SQL files found in drizzle directory.');
  process.exit(1);
}

let combined = 'export const createTbleSqlRaw = `\n';
for (const file of sqlFiles) {
  const filePath = join(drizzleDir, file);
  combined += readFileSync(filePath, 'utf8') + '\n';
}
combined += '`;\n';

// 4. Ensure output directory exists
mkdirSync(join(process.cwd(), 'utils/db'), { recursive: true });

// 5. Write the TS file
writeFileSync(outputFile, combined, 'utf8');
console.log(`✅ Wrote combined SQL to ${outputFile}`);
