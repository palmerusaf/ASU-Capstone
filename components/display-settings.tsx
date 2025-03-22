import * as Card from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { JSX, useEffect, useState } from 'react';

export function DisplaySettings(): JSX.Element {
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
