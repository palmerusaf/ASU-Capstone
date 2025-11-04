import { db } from '@/utils/db/db';
import {
  employmentTypeList,
  jobCommentsTable,
  jobStatus,
  jobTable,
  payTypeList,
  resumes,
  rawResumes,
} from '@/utils/db/schema';
import { faker } from '@faker-js/faker';

import * as icon from 'lucide-react';
import { Button } from './ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { Repl } from '@electric-sql/pglite-repl';
import { updateStatus } from './job-tracker-Page/columns';
import { AsyncButton } from './async-button';
import { linkResume } from './job-tracker-Page/resume-matches-modal';

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
        variant='secondary'
        className='cursor-pointer'
        loadingText='Seeding Resume...'
        onClickAsync={() => seedResume()}
      >
        Seed Resume
      </AsyncButton>
      <AsyncButton
        variant='secondary'
        className='cursor-pointer'
        loadingText='Linking Resumes/Jobs...'
        onClickAsync={() => linkAllResumes()}
      >
        Link Resumes/Jobs
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

    //set statuses we have to do it one at a time so they get random statuses
    await Promise.all(
      insertedJobs.map(({ id }) => {
        updateStatus({
          ids: [id],
          status: faker.helpers.arrayElement(jobStatus),
        });
      })
    );
  }
  async function seedResume() {
    // Insert resume JSON
    const resume = {
      userId: faker.string.uuid(),
      name: faker.person.fullName() + "'s Resume",
      json: {
        basics: {
          name: faker.person.fullName(),
          label: faker.person.jobTitle(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          summary: faker.lorem.sentences(3),
          location: {
            city: faker.location.city(),
            region: faker.location.state(),
          },
        },
        work: Array.from({ length: 2 }).map(() => ({
          company: faker.company.name(),
          position: faker.person.jobTitle(),
          startDate: faker.date.past({ years: 5 }),
          endDate: faker.date.past({ years: 1 }),
          summary: faker.lorem.sentences(2),
        })),
        education: [
          {
            institution: faker.company.name() + ' University',
            area: faker.person.jobArea(),
            studyType: 'Bachelor',
            startDate: faker.date.past({ years: 8 }),
            endDate: faker.date.past({ years: 4 }),
          },
        ],
        skills: Array.from({ length: 5 }).map(() => ({
          name: faker.hacker.noun(),
          level: faker.helpers.arrayElement([
            'beginner',
            'intermediate',
            'advanced',
          ]),
        })),
      },
    };

    const [insertedResume] = await db
      .insert(resumes)
      .values(resume)
      .returning({ id: resumes.id });

    // Insert raw resume text
    await db.insert(rawResumes).values({
      name: resume.name,
      rawText: faker.lorem.paragraphs(4),
      source: 'builder',
      jsonId: insertedResume.id,
    });
  }
  async function linkAllResumes() {
    const resumeData = await db
      .select({
        id: resumes.id,
      })
      .from(resumes);
    const resumeIds = resumeData.map((el) => el.id);
    const jobData = await db.select({ id: jobTable.id }).from(jobTable);
    const jobIds = jobData.map((el) => el.id);
    await Promise.all(
      jobIds.map((id) => {
        linkResume(faker.helpers.arrayElement(resumeIds), id, qc);
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
