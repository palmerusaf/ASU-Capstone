import type { Meta, StoryObj } from '@storybook/react';
import * as iconLib from 'lucide-react';

import { SideBar } from './sidebar';

const meta = {
  component: SideBar,
} satisfies Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuData: [
      {
        menu: 'Menu1',
        icon: iconLib.Bed,
        items: [
          { subMenu: 'SubMenu1', content: 'content1' },
          {
            subMenu: 'SubMenu2',
            content: (
              <a href='https://google.com' target='_blank'>
                google
              </a>
            ),
          },
        ],
      },
      {
        menu: 'Menu2',
        icon: iconLib.Briefcase,
        items: [{ subMenu: 'SubMenu3', content: 'content3' }],
      },
    ],
  },
};
