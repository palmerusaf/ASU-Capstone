'use client';

import { jobStatus, statusColors } from '@/utils/db/schema';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StreamGraphData {
  date: string;
  [key: string]: string | number;
}

interface JobStatusStreamGraphProps {
  data: StreamGraphData[];
}

const JobStatusStreamgraph: React.FC<JobStatusStreamGraphProps> = ({
  data,
}) => {
  return (
    <div className='w-full h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-slate-500 mb-2'>
            Job Application Status Timeline
          </h1>
          <p className='text-slate-500'></p>
        </div>

        <div className='p-6'>
          <ResponsiveContainer width='100%' height={500}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              stackOffset='wiggle'
            >
              <XAxis
                dataKey='date'
                stroke='#797d85'
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #797d85',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType='circle' />

              {jobStatus.map((status) => (
                <Area
                  key={status}
                  type='monotone'
                  dataKey={status}
                  stackId='1'
                  stroke={statusColors[status]}
                  fill={statusColors[status]}
                  fillOpacity={0.8}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default JobStatusStreamgraph;
