'use client';

import { getStreamgraphData } from '@/utils/db/jobStatusHistory';
import JobStatusStreamGraph from './jobStatusStreamGraph';

export default function StreamgraphPage() {
  const [data, setData] = useState<
    Array<{ date: string; [key: string]: string | number }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const streamData = await getStreamgraphData();
        setData(streamData);
      } catch (err) {
        console.error('Failed to load streamgraph data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-xl text-slate-500'>Loading streamgraph...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-xl text-red-600'>{error}</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-xl text-slate-500'>No data available</div>
      </div>
    );
  }

  return <JobStatusStreamGraph data={data} />;
}
