import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Paths
const drizzleDir = join(process.cwd(), 'drizzle');
const outputFile = join(process.cwd(), 'utils/db/createTbleSqlRaw.ts');

// 1. Run drizzle-kit generate
execSync(
  `pnpm drizzle-kit generate --dialect=postgresql --schema=./utils/db/schema.ts`,
  { stdio: 'inherit' }
);

// 2. Collect all .sql files
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

// 3. Ensure output directory exists
mkdirSync(join(process.cwd(), 'utils/db'), { recursive: true });

// 4. Write the TS file
writeFileSync(outputFile, combined, 'utf8');
console.log(`✅ Wrote combined SQL to ${outputFile}`);
