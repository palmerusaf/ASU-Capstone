import { useEffect, useMemo, useState } from 'react';

export default function App() {
  type ViewType = 'link' | 'tracker' | 'search';
  const [activeView, setActiveView] = useState<ViewType>('link');
  return (
    <div className="flex gap-2 p-2 h-svh">
      <div className="flex flex-col gap-2 p-4 text-center bg-gray-300 rounded-lg text-nowrap w-fit">
        <div className="text-lg font-bold underline select-none">Menu</div>
        <Button title="Link Accounts" view="link" />
        <Button title="Find Jobs" view="search" />
        <Button title="Job Tracker" view="tracker" />
      </div>
      <div className="p-4 w-full bg-gray-300 rounded-lg">
        <View />
      </div>
    </div>
  );

  function View() {
    switch (activeView) {
      case 'tracker':
        return 'tracker';
      case 'link':
        return LinkView();
      case 'search':
        return 'search';
    }
  }

  function Button({ title, view }: { title: string; view: ViewType }) {
    return (
      <button
        className={`py-2 px-3 bg-gray-400 rounded-full duration-150 hover:scale-105 ${activeView == view && 'font-bold'}`}
        onClick={() => setActiveView(view)}
      >
        {title}
      </button>
    );
  }
}

function LinkView() {
  type ViewType = 'linkedin' | 'handshake';
  const [activeView, setActiveView] = useState<ViewType>('handshake');
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-2 gap-2">
        <Button title={'Handshake'} view={'handshake'} />
        <Button title={'LinkedIn'} view={'linkedin'} />
      </div>
      <View />
    </div>
  );

  function View() {
    switch (activeView) {
      case 'handshake':
        return 'handshake';
      case 'linkedin':
        return 'linkedin';
    }
  }

  function Button({ title, view }: { title: string; view: ViewType }) {
    return (
      <button
        className={`py-2 px-3 bg-gray-400 text-xl rounded-full duration-100 outline-gray-500 hover:outline ${activeView == view && 'font-bold outline'}`}
        onClick={() => setActiveView(view)}
      >
        {title}
      </button>
    );
  }
}
