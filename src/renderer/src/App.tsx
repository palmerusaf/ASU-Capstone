import { Layout } from '@renderer/components/layout'
import * as icon from 'lucide-react'
import { useState } from 'react'

const data = [
  {
    title: 'Connect Providers',
    icon: icon.Link,
    items: [
      {
        title: 'Handshake'
      }
    ]
  },
  {
    title: 'Manage Applications',
    icon: icon.Briefcase,
    items: [
      {
        title: 'Find New Jobs'
      }
    ]
  },
  {
    title: 'Manage Resumes',
    icon: icon.Pencil,
    items: [
      {
        title: 'Upload Resume'
      }
    ]
  },
  {
    title: 'Settings',
    icon: icon.Settings2,
    items: [
      {
        title: 'Display'
      }
    ]
  }
] as const

export type DataType = typeof data
export type MenuType = DataType[number]['title']
export type SubMenuType = DataType[number]['items'][number]['title']
type PageRouterType = { [key in SubMenuType]: JSX.Element }

const pageRouter: PageRouterType = {
  Handshake: <div>HandShake Page</div>,
  'Find New Jobs': <div>New jobs Page</div>,
  'Upload Resume': <div>upload Page</div>,
  Display: <div>Display Page</div>
}

export default function App() {
  const [active, setActive] = useState<{ menu: MenuType; submenu: SubMenuType }>({
    menu: 'Connect Providers',
    submenu: 'Handshake'
  })
  return (
    <Layout setActive={setActive} data={data} menu={active.menu} submenu={active.submenu}>
      {pageRouter[active.submenu]}
    </Layout>
  )
}
