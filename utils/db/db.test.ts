import 'fake-indexeddb/auto';
import { expect, test } from 'vitest';
import { db } from './db.ts';
import { testSchema } from './schema.ts';

test('writing test data passes', async () => {
  const inserted = await db
    .insert(testSchema)
    .values({ testField: 'testdata' })
    .returning();
  expect(inserted.length).toBe(1);
});

test('reading test data passes', async () => {
  await db.insert(testSchema).values({ testField: 'val1' });
  const res = await db.select().from(testSchema);
  expect(res.length).toBe(2);
  expect(res[1].testField).toBe('val1');
  expect(res[1].id).toBeDefined();
  await db.insert(testSchema).values({ testField: 'val2' });
  const res2 = await db.select().from(testSchema);
  expect(res2.length).toBe(3);
});
