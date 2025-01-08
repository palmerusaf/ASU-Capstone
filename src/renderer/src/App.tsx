import { Layout } from '@renderer/components/layout'
import { SearchJobs } from './JobPages.js'
import * as Card from '@renderer/components/ui/card'
import { Switch } from '@renderer/components/ui/switch'
import * as icon from 'lucide-react'
import { useEffect, useState } from 'react'
import { ConnectHandshakePage } from './ConnectPages'
import { WithProviders } from './WithProviders'

const menuData = [
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

export type MenuData = typeof menuData
export type MainMenu = MenuData[number]['title']
export type SubMenu = MenuData[number]['items'][number]['title']
type PageRouterType = { [key in SubMenu]: JSX.Element }

const pageRouter: PageRouterType = {
  Display: <DisplaySettings />,
  Handshake: <ConnectHandshakePage />,
  'Find New Jobs': <SearchJobs />,
  'Upload Resume': undefined
}

export default function App() {
  const [active, setActive] = useState<{ menu: MainMenu; submenu: SubMenu }>({
    menu: 'Connect Providers',
    submenu: 'Handshake'
  })
  return (
    <WithProviders>
      <Layout setActive={setActive} menuData={menuData} menu={active.menu} submenu={active.submenu}>
        {pageRouter[active.submenu] || <NotImplemented />}
      </Layout>
    </WithProviders>
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
    <Card.Card className="flex flex-col items-center mx-auto w-full max-w-2xl">
      <Card.CardHeader>
        <Card.CardTitle>
          <div className="text-xl">Display Settings</div>
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent className="flex gap-2">
        <Switch
          id="airplane-mode"
          checked={active}
          onCheckedChange={(e) => setActive(e.valueOf())}
        />
        <label htmlFor="airplane-mode">Dark Mode</label>
      </Card.CardContent>
    </Card.Card>
  )
}
