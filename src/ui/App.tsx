import { useEffect, useState } from 'react';

export default function App() {
  const [activeView, setActiveView] = useState<MainViews>('Link Accounts');
  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);
  return (
    <div className="flex gap-2 p-2 h-svh">
      <div className="flex flex-col gap-2 p-4 text-center bg-gray-300 rounded-lg text-nowrap w-fit">
        <div className="text-lg font-bold underline select-none">Menu</div>
        <Button view="Link Accounts" />
        <Button view="Find Jobs" />
        <Button view="Job Tracker" />
      </div>
      <div className="p-4 w-full bg-gray-300 rounded-lg">
        <View />
      </div>
    </div>
  );

  function View() {
    switch (activeView) {
      case 'Job Tracker':
        return 'tracker';
      case 'Link Accounts':
        return LinkView();
      case 'Find Jobs':
        return 'search';
    }
  }

  function Button({ view }: { view: MainViews }) {
    return (
      <button
        className={`py-2 px-3 bg-gray-400 rounded-full duration-150 hover:scale-105 ${activeView == view && 'font-bold'}`}
        onClick={() => setActiveView(view)}
      >
        {view}
      </button>
    );
  }
}

function LinkView() {
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

  const [activeView, setActiveView] = useState<JobSites>('Handshake');
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-2 gap-2">
        <Button view={'Handshake'} isLinked={linkStat.handshake} />
        <Button view={'LinkedIn'} isLinked={linkStat.linkedIn} />
      </div>
      <View />
    </div>
  );

  function View() {
    switch (activeView) {
      case 'LinkedIn':
        return <LinkedinView />;
      case 'Handshake':
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
    const [isLoading, setIsLoading] = useState(false);
    function handleClick() {
      setIsLoading(true);
    }
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
        <button
          className={`py-2 px-6 text-2xl bg-gray-400 rounded-full duration-100 outline-gray-500 hover:outline ${isLoading && 'animate-pulse'}`}
          onClick={handleClick}
        >
          {(linkStat.linkedIn && '✅ ') || '❌ '}
          {isLoading ? 'Testing...' : 'Test'}
        </button>
      </div>
    );
  }

  function Button({ view, isLinked }: { view: JobSites; isLinked: boolean }) {
    return (
      <button
        className={`py-2 px-3 bg-gray-400 text-xl rounded-full duration-100 outline-gray-500 hover:outline ${activeView == view && 'font-bold'}`}
        onClick={() => setActiveView(view)}
      >
        {(isLinked && '✅ ') || '❌ '}
        {view}
      </button>
    );
  }
}
