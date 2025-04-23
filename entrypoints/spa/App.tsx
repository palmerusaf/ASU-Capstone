import { DisplaySettings } from '@/components/display-settings';
import { JobTrackerPage } from '@/components/job-tracker-Page/page';
import { LoginPage } from '@/components/login-page';
import { QueryExample } from '@/components/query-example';
import { QueryProvider } from '@/components/query-provider';
import { ResumeDisplay } from '@/components/resume-display';
import { ResumeUpload } from '@/components/resume-upload.tsx';
import useAuth from '@/utils/auth';
import * as icon from 'lucide-react';
import { Toaster } from 'sonner';

export default function App() {
  const session = useAuth();
  const loggedIn = session !== null;
  return (
    <QueryProvider>
      <Toaster richColors position="top-center" />
      {loggedIn ? <AuthenticatedUsersSPA /> : <LoginPage />}
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
              subMenu: 'Fetching Example',
              content: <QueryExample />,
            },
            {
              subMenu: 'View Jobs',
              content: <JobTrackerPage />,
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
            }
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
