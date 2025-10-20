import { db } from '@/utils/db/db';
import {
  employmentTypeList,
  jobCommentsTable,
  appliedJobsTable,
  jobStatus,
  jobTable,
  payTypeList,
} from '@/utils/db/schema';
import { faker } from '@faker-js/faker';

import * as icon from 'lucide-react';
import { Button } from './ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { Repl } from '@electric-sql/pglite-repl';
import { updateStatus } from './job-tracker-Page/columns';
import { AsyncButton } from './async-button';

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
      <AsyncButton
        variant={'secondary'}
        className='cursor-pointer'
        loadingText='Seeding Job...'
        onClickAsync={() => seedJobs(1)}
      >
        Seed Job
      </AsyncButton>
      <AsyncButton
        variant={'secondary'}
        className='cursor-pointer'
        loadingText='Seeding 25 Jobs...'
        onClickAsync={() => seedJobs(25)}
      >
        Seed 25 Jobs
      </AsyncButton>
      <AsyncButton
        variant={'destructive'}
        className='cursor-pointer'
        loadingText='Nuking Jobs'
        onClickAsync={async () => {
          await db.delete(jobTable);
          await qc.invalidateQueries({ queryKey: ['savedJobs'] });
          await qc.invalidateQueries({ queryKey: ['archivedJobs'] });
        }}
      >
        Nuke Jobs
      </AsyncButton>
    </div>
  );

  async function seedJobs(numJobs: number) {
    const jobs: (typeof jobTable.$inferInsert)[] = [];

    for (let i = 0; i < numJobs; i++) {
      const companyName = faker.helpers.arrayElement(companyNames);
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
        status: jobStatus[1],
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

    // add comments
    for (const { id: jobId } of insertedJobs) {
      const comments = Array.from({
        length: faker.number.int({ min: 0, max: 3 }),
      }).map(() => ({
        jobId,
        comment: faker.lorem.sentence(),
      }));
      if (comments.length > 0)
        await db.insert(jobCommentsTable).values(comments);
    }

    //set statuses
    await Promise.all(
      insertedJobs.map(({ id }) => {
        updateStatus({ id, status: faker.helpers.arrayElement(jobStatus) });
      })
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
