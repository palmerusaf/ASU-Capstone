import { Layout } from '@renderer/components/layout'
import { Switch } from '@renderer/components/ui/switch'
import * as icon from 'lucide-react'
import { useEffect, useState } from 'react'

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
  Display: <DisplaySettings />,
  Handshake: undefined,
  'Find New Jobs': undefined,
  'Upload Resume': undefined
}

export default function App() {
  const [active, setActive] = useState<{ menu: MenuType; submenu: SubMenuType }>({
    menu: 'Connect Providers',
    submenu: 'Handshake'
  })
  return (
    <Layout setActive={setActive} data={data} menu={active.menu} submenu={active.submenu}>
      {pageRouter[active.submenu] || <NotImplemented />}
    </Layout>
  )
}

function NotImplemented() {
  return <div className="flex justify-center items-center w-full h-full">Not Implemented</div>
}

function DisplaySettings(): JSX.Element {
  const [active, setActive] = useState(
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
  useEffect(() => {
    if (!('theme' in localStorage)) {
      localStorage.setItem('theme', active ? 'dark' : 'light')
    }
    localStorage.theme = active ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', active)
  }, [active])

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          checked={active}
          onCheckedChange={(e) => setActive(e.valueOf())}
        />
        <label htmlFor="airplane-mode">Dark Mode</label>
      </div>
    </div>
  )
}
