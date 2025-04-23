import { DisplaySettings } from '@/components/display-settings';
import JobTrackerPage from '@/components/job-tracker-Page/page';
import { ResumeUpload } from '@/components/resume-upload.tsx';
import { QueryProvider } from '@/components/query-provider';
import { LoginPage } from '@/components/login-page';
import { Toaster } from 'sonner';
import useAuth from '@/utils/auth';
import * as icon from 'lucide-react';
import { ResumeDisplay } from '@/components/resume-display.tsx';

export default function App() {
  const session = useAuth();
  const loggedIn = session !== null;
  return (
    <QueryProvider>
      <Toaster richColors position="top-center" />
      {loggedIn ? <AuthenticatedUsersSPA /> : <LoginPage />}
    </QueryProvider >
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
