import { DisplaySettings } from '@/components/display-settings';
import { LoginPage } from '@/components/login-page';
import { QueryExample } from '@/components/query-example';
import { QueryProvider } from '@/components/query-provider';
import { ResumeUpload } from '@/components/resume-upload.tsx';
import useAuth from '@/utils/auth';
import * as icon from 'lucide-react';
import { JobTrackerPage } from "c:/Users/ARYA/Desktop/ASU-Capstone/components/job-tracker-Page/page";

export default function App() {
  const session = useAuth();
  const loggedIn = session !== null;
  return (
    <QueryProvider>
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
