type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type MainViews = 'Link Accounts' | 'Job Tracker' | 'Find Jobs';

type JobSites = 'LinkedIn' | 'Handshake';

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE';

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: MainViews;
  sendFrameAction: FrameWindowAction;
  testHandshakeLink: boolean;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void,
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
    testHandshakeLink: () => Promise<boolean>;
    subscribeChangeView: (
      callback: (view: MainViews) => void,
    ) => UnsubscribeFunction;
    sendFrameAction: (payload: FrameWindowAction) => void;
  };
}
