import { db } from '@/utils/db/db';
import {
  employmentTypeList,
  jobCommentsTable,
  jobEventsTable,
  jobStatus,
  jobTable,
  payTypeList,
} from '@/utils/db/schema';
import { faker } from '@faker-js/faker';

import * as icon from 'lucide-react';
import { Button } from './ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { PGlite } from '@electric-sql/pglite';
import { Repl } from '@electric-sql/pglite-repl';

export const devMenu = import.meta.env.DEV
  ? [
    {
      menu: 'Dev Menu',
      icon: icon.LucideWrench,
      items: [
        {
          subMenu: 'Seed',
          content: <SeedPage />,
        },
        {
          subMenu: 'PG Repl',
          content: <PGRepl />,
        },
      ],
    },
  ]
  : [];

function SeedPage() {
  const companyNames = [
    'Google',
    'Amazon',
    'Lockheed Martin',
    'SpaceX',
    'Raytheon',
    'Microsoft',
    'Meta',
    'Apple',
    'Palantir',
    'Netflix',
  ];
  const qc = useQueryClient();
  return (
    <div className='grid grid-cols-2 w-lg mx-auto mt-4 gap-2 justify-center'>
      <Button
        variant={'secondary'}
        className='cursor-pointer'
        onClick={() => seedJobs(1)}
      >
        Seed Job
      </Button>
      <Button
        variant={'secondary'}
        className='cursor-pointer'
        onClick={() => seedJobs(25)}
      >
        Seed 25 Jobs
      </Button>
      <Button
        variant={'destructive'}
        className='cursor-pointer'
        onClick={async () => {
          await db.delete(jobTable);
          await qc.invalidateQueries({ queryKey: ['savedJobs'] });
          await qc.invalidateQueries({ queryKey: ['archivedJobs'] });
        }}
      >
        Nuke Jobs
      </Button>
    </div>
  );

  async function seedJobs(numJobs: number) {
    console.log('🌱 Seeding database...');

    const jobs: (typeof jobTable.$inferInsert)[] = [];

    for (let i = 0; i < numJobs; i++) {
      const companyName = faker.helpers.arrayElement(companyNames);
      const status = faker.helpers.arrayElement(jobStatus);
      const job = {
        archived: false,
        intern: faker.datatype.boolean(),
        companyName,
        companyLogoUrl: faker.image.urlPicsumPhotos(),
        employmentType: faker.helpers.arrayElement(employmentTypeList),
        description: faker.lorem.paragraph({ max: 60, min: 20 }),
        remote: faker.datatype.boolean(),
        title: faker.person.jobTitle(),
        location: faker.location.city(),
        link: faker.internet.url(),
        status,
        payrate: faker.number.int({ min: 40000, max: 150000 }),
        payType: faker.helpers.arrayElement(payTypeList),
        datePosted: faker.date.past({ years: 1 }),
        closeOutDate: faker.date.future({ years: 1 }),
        jobIdFromSite: faker.string.uuid(),
      };
      jobs.push(job);
    }

    const insertedJobs = await db
      .insert(jobTable)
      .values(jobs)
      .returning({ id: jobTable.id });

    for (const { id: jobId } of insertedJobs) {
      await db
        .insert(jobEventsTable)
        .values({ jobId, eventType: faker.helpers.arrayElement(jobStatus) });

      const comments = Array.from({
        length: faker.number.int({ min: 0, max: 3 }),
      }).map(() => ({
        jobId,
        comment: faker.lorem.sentence(),
      }));
      if (comments.length > 0)
        await db.insert(jobCommentsTable).values(comments);
    }

    console.log(
      `✅ Seeded ${insertedJobs.length} jobs with events and comments`
    );
  }
}

function PGRepl() {
  return (
    <>
      <Repl pg={db.$client} />
    </>
  );
}
