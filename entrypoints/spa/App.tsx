import { AddJobPage } from '@/components/add-job-Page/page';
import { DisplaySettings } from '@/components/display-settings';
import { JobArchivePage } from '@/components/job-archive-Page/page';
import { JobTrackerPage } from '@/components/job-tracker-Page/page';
// import { LoginPage } from '@/components/login-page';
import { QueryProvider } from '@/components/query-provider';
import { ResumeDisplay } from '@/components/resume-display';
import { ResumeUpload } from '@/components/resume-upload.tsx';
// import useAuth from '@/utils/auth';
import * as icon from 'lucide-react';
import { Toaster } from 'sonner';
import { devMenu } from '../../components/dev-menu';
import { PrevAppsPage } from '@/components/prev-apps-page';
import { TotalJobs } from '@/components/total-jobs-page';
import StreamgraphPage from '@/components/streamGraphPage';

export default function App() {
  // disable auth
  // const session = useAuth();
  // const loggedIn = session !== null;
  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, []);
  return (
    <QueryProvider>
      <Toaster richColors position='top-center' />
      {/* disable auth workflow */}
      {/* {loggedIn ? <AuthenticatedUsersSPA /> : <LoginPage />} */}
      <AuthenticatedUsersSPA />
    </QueryProvider>
  );
}

function AuthenticatedUsersSPA() {
  return (
    <SideBar
      menuData={[
        {
          menu: 'Manage Applications',
          icon: icon.Briefcase,
          items: [
            {
              subMenu: 'Job Tracker',
              content: <JobTrackerPage />,
            },
            {
              subMenu: 'Add Job',
              content: <AddJobPage />,
            },
            {
              subMenu: 'Archived Jobs',
              content: <JobArchivePage />,
            },
            {
              subMenu: 'Previous Apps',
              content: <PrevAppsPage />,
            },
          ],
        },
        {
          menu: 'Manage Resumes',
          icon: icon.Pencil,
          items: [
            {
              subMenu: 'Upload Resume',
              content: <ResumeUpload />,
            },
            {
              subMenu: 'Display Resume',
              content: <ResumeDisplay />,
            },
          ],
        },
        {
          menu: 'Stats',
          icon: icon.LineChart,
          items: [
            {
              subMenu: 'Total Jobs',
              content: <TotalJobs />,
            },
            {
              subMenu: 'Job Status',
              content: <StreamgraphPage />,
            },
          ],
        },
        {
          menu: 'Settings',
          icon: icon.Settings2,
          items: [
            {
              subMenu: 'Display',
              content: <DisplaySettings />,
            },
          ],
        },
        ...devMenu,
      ]}
    />
  );
}

function NotImplemented() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      Not Implemented
    </div>
  );
}
