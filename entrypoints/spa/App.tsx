import { Layout } from '@/components/layout';
import * as Card from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import * as icon from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

const menuData = [
  {
    title: 'Manage Applications',
    icon: icon.Briefcase,
    items: [
      {
        title: 'View Jobs',
      },
    ],
  },
  {
    title: 'Manage Resumes',
    icon: icon.Pencil,
    items: [
      {
        title: 'Upload Resume',
      },
    ],
  },
  {
    title: 'Settings',
    icon: icon.Settings2,
    items: [
      {
        title: 'Display',
      },
    ],
  },
] as const;

export type MenuData = typeof menuData;
export type MainMenu = MenuData[number]['title'];
export type SubMenu = MenuData[number]['items'][number]['title'];
type PageRouterType = { [key in SubMenu]: React.ReactNode };

const pageRouter: PageRouterType = {
  Display: <DisplaySettings />,
  'Upload Resume': '',
  'View Jobs': '',
};

export default function App() {
  const [active, setActive] = useState<{ menu: MainMenu; submenu: SubMenu }>({
    menu: 'Settings',
    submenu: 'Display',
  });
  return (
    <Layout
      setActive={setActive}
      menuData={menuData}
      menu={active.menu}
      submenu={active.submenu}
    >
      {pageRouter[active.submenu] || <NotImplemented />}
    </Layout>
  );
}

function NotImplemented() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      Not Implemented
    </div>
  );
}

function DisplaySettings(): JSX.Element {
  const [active, setActive] = useState(
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  useEffect(() => {
    if (!('theme' in localStorage)) {
      localStorage.setItem('theme', active ? 'dark' : 'light');
    }
    localStorage.theme = active ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', active);
  }, [active]);

  return (
    <Card.Card className='flex flex-col items-center mx-auto w-full max-w-2xl'>
      <Card.CardHeader>
        <Card.CardTitle>
          <div className='text-xl'>Display Settings</div>
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent className='flex gap-2'>
        <Switch
          id='airplane-mode'
          checked={active}
          onCheckedChange={(e: {
            valueOf: () => boolean | ((prevState: boolean) => boolean);
          }) => setActive(e.valueOf())}
        />
        <label htmlFor='airplane-mode'>Dark Mode</label>
      </Card.CardContent>
    </Card.Card>
  );
}
