import { DisplaySettings } from '@/components/display-settings';
import * as icon from 'lucide-react';

export default function App() {
  return (
    <SideBar
      menuData={[
        {
          menu: 'Manage Applications',
          icon: icon.Briefcase,
          items: [
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
              content: <NotImplemented />,
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
