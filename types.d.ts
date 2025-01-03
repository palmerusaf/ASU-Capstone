type MainViews = 'Link Accounts' | 'Job Tracker' | 'Find Jobs';

type JobSites = 'LinkedIn' | 'Handshake';

type EventPayloadMapping = {
  changeView: MainViews;
  testHandshakeLink: Promise<boolean>;
  openUrl: string;
  getApiUrl: string;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    testHandshakeLink: () => Promise<boolean>;
    getApiUrl: () => Promise<string>;
    openUrl: (url: string) => void;
    subscribeChangeView: (
      callback: (view: MainViews) => void,
    ) => UnsubscribeFunction;
  };
}
