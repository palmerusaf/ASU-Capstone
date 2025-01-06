import * as React from 'react'
import * as icon from 'lucide-react'

import { NavMain } from '@renderer/components/nav-main'
import { Sidebar, SidebarContent, SidebarRail } from '@renderer/components/ui/sidebar'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Connect Providers',
      url: '#',
      icon: icon.Link,
      isActive: true,
      items: [
        {
          title: 'Handshake',
          url: '#'
        }
      ]
    },
    {
      title: 'Manage Applications',
      url: '#',
      icon: icon.Briefcase,
      items: [
        {
          title: 'Find New Jobs',
          url: '#'
        }
      ]
    },
    {
      title: 'Manage Resumes',
      url: '#',
      icon: icon.Pencil,
      items: [
        {
          title: 'Upload Resume',
          url: '#'
        }
      ]
    },
    {
      title: 'Settings',
      url: '#',
      icon: icon.Settings2,
      items: [
        {
          title: 'Display',
          url: '#'
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
