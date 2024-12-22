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
  type LinkStatType = { linkedIn: boolean; handshake: boolean };
  const [linkStat, setLinkStat] = useState<LinkStatType>(() => {
    const storedLinkStat = localStorage.getItem('linkStat');
    if (!storedLinkStat) {
      return {
        handshake: false,
        linkedIn: false,
      };
    }
    return JSON.parse(storedLinkStat);
  });
  useEffect(() => {
    localStorage.setItem('linkStat', JSON.stringify(linkStat));
  }, [linkStat]);

  const [activeView, setActiveView] = useState<ViewType>('handshake');
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-2 gap-2">
        <Button
          title={'Handshake'}
          view={'handshake'}
          isLinked={linkStat.handshake}
        />
        <Button
          title={'LinkedIn'}
          view={'linkedin'}
          isLinked={linkStat.linkedIn}
        />
      </div>
      <View />
    </div>
  );

  function View() {
    switch (activeView) {
      case 'linkedin':
        return <LinkedinView />;
      case 'handshake':
        return <HandshakeView />;
    }
  }

  function LinkedinView() {
    return (
      <div className="flex flex-col gap-2 items-center py-6">
        <div className="text-xl">Not Implemented</div>
      </div>
    );
  }

  function HandshakeView() {
    return (
      <div className="flex flex-col gap-2 items-center py-6">
        <div className="text-xl">
          Click{' '}
          <a
            className="font-bold underline"
            href="https://app.joinhandshake.com/login"
            target="_blank"
          >
            here
          </a>{' '}
          to login. Then return to this page and click the test button below.
        </div>
        <button className="py-2 px-6 text-2xl bg-gray-400 rounded-full duration-100 outline-gray-500 hover:outline">
          {(linkStat.linkedIn && '✅ ') || '❌ '}
          Test
        </button>
      </div>
    );
  }

  function Button({
    title,
    view,
    isLinked,
  }: {
    title: string;
    view: ViewType;
    isLinked: boolean;
  }) {
    return (
      <button
        className={`py-2 px-3 bg-gray-400 text-xl rounded-full duration-100 outline-gray-500 hover:outline ${activeView == view && 'font-bold'}`}
        onClick={() => setActiveView(view)}
      >
        {(isLinked && '✅ ') || '❌ '}
        {title}
      </button>
    );
  }
}
