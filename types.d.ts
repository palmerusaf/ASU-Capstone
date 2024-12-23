type MainViews = 'Link Accounts' | 'Job Tracker' | 'Find Jobs';

type JobSites = 'LinkedIn' | 'Handshake';

type EventPayloadMapping = {
  changeView: MainViews;
  testHandshakeLink: Promise<boolean>;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    testHandshakeLink: () => Promise<boolean>;
    subscribeChangeView: (
      callback: (view: MainViews) => void,
    ) => UnsubscribeFunction;
  };
}
