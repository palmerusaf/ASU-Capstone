import { Button } from '@/components/ui/button';
import { HandshakeJobDataType } from '@/utils/db/schema';

export function JobTracker() {
  return <Button>hi</Button>;
}

export function JobTrackerDisplay() {
  return (
    <div className='w-full h-screen'>
      <JobTracker />
    </div>
  );
}


async function GetJobs() {
    const allSavedJobs =
      (await storage.getItem<HandshakeJobDataType[]>('local:HandshakeJobs')) ??
      [];
    console.log(allSavedJobs);
  }
  
  function Implemented() {
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <button
          onClick={GetJobs}
          className='mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Display Jobs
        </button>
      </div>
    );
  }
  