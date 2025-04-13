import { DisplaySettings } from '@/components/display-settings';
import * as icon from 'lucide-react';
import { ResumeUpload } from '@/components/resume-upload.tsx';
import { QueryProvider } from '@/components/query-provider';
import { QueryExample } from '@/components/query-example';
import { LoginPage } from '../../components/login-page';

export default function App() {
  return (
    <QueryProvider>
      <SPA />
    </QueryProvider>
  );
}

function SPA() {
  const auth = useAuthQuery();
  const loggedIn = auth.data?.data.session !== null;
  return loggedIn ? <AuthenticatedUsersSPA /> : <LoginPage />;
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
              content: <NotImplemented />,
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
