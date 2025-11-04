import React from 'react';
import { listResumeStatusCounts } from '@/utils/db/resumes';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { statusColors } from '@/utils/db/schema';

// rows: [{ resumeId, status, count, label? }, ...]
function pivot(rows: Awaited<ReturnType<typeof listResumeStatusCounts>>) {
    const byKey: Record<string, Record<string, number>> = {};
    const statuses = new Set<string>();

    for (const r of rows) {
        const x = r.name == null ? 'Unassigned' : `${String(r.name)}`;

        if (!byKey[x]) byKey[x] = {};
        byKey[x][r.status] = r.count;
        statuses.add(r.status);
    }

    const data = Object.entries(byKey).map(([x, obj]) => ({ x, ...obj }));
    return { data, statuses: Array.from(statuses) };
}

export function ResumeStatusGraph() {
    const [rows, setRows] = React.useState<Awaited<
        ReturnType<typeof listResumeStatusCounts>
    > | null>(null);
    const [err, setErr] = React.useState<string | null>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const data = await listResumeStatusCounts();
                setRows(data);
            } catch (e: any) {
                setErr(e?.message || 'Failed to load resume stats');
                setRows([]);
            }
        })();
    }, []);

    if (rows === null) return <div>Loading resume stats…</div>;
    if (err) return <div className='text-red-600'>Error: {err}</div>;
    if (rows.length === 0) return <div>No resume status data…</div>;

    const { data, statuses } = pivot(rows);

    return (
        <div className='w-full'>
            <h3 style={{ marginBottom: 8, fontWeight: 600 }}>
                Resume Status Breakdown
            </h3>

            <ResponsiveContainer width='100%' height={320}>
                <BarChart data={data}>
                    <XAxis
                        dataKey='x'
                        tickLine={false}
                        tickFormatter={(t: string) =>
                            t?.length > 22 ? `${t.slice(0, 21)}…` : t
                        }
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    {statuses.map((s) => (
                        <Bar
                            key={s}
                            dataKey={s}
                            stackId='a'
                            fill={statusColors[s as keyof typeof statusColors]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
