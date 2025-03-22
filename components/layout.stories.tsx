import type { Meta, StoryObj } from '@storybook/react';
import * as icon from 'lucide-react';
import { Layout } from './layout';
import { JSX, useEffect, useState } from 'react';

const meta = {
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

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
  Display: 'Display',
  'Upload Resume': '',
  'View Jobs': '',
};
export const Default: Story = {
  render: () => {
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
        {pageRouter[active.submenu] || 'not implemented'}
      </Layout>
    );
  },
};
