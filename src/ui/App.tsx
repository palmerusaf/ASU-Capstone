import { useEffect, useMemo, useState } from 'react';

export default function App() {
  type View = 'link' | 'tracker' | 'search';
  const [activeView, setActiveView] = useState<View>('link');
  return (
    <div className="flex gap-2 p-2 h-svh">
      <div className="flex flex-col gap-2 p-4 text-center bg-gray-300 rounded-lg text-nowrap w-fit">
        <div className="text-lg font-bold underline select-none">Menu</div>
        <Button title="Link Accounts" view="link" />
        <Button title="Find Jobs" view="search" />
        <Button title="Job Tracker" view="tracker" />
      </div>
      <div className="p-4 w-full bg-gray-300 rounded-lg">
        <MainView />
      </div>
    </div>
  );

  function Button({ title, view }: { title: string; view: View }) {
    return (
      <button
        className={`py-2 px-3 bg-gray-400 rounded-full duration-150 hover:scale-105 ${activeView == view && 'font-bold'}`}
        onClick={() => setActiveView(view)}
      >
        {title}
      </button>
    );
  }

  function MainView() {
    switch (activeView) {
      case 'tracker':
        return 'tracker';
      case 'link':
        return 'link';
      case 'search':
        return 'search';
    }
  }
}
