import React from "react";
import { listResumeStatusCounts } from "@/utils/db/resumes";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Light/Dark palettes
const LIGHT = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"];
const DARK  = ["#93c5fd", "#86efac", "#fcd34d", "#fca5a5", "#67e8f9", "#d8b4fe"];

function usePalette() {
    const getIsDark = () =>
        (typeof window !== "undefined" &&
            (window.matchMedia?.("(prefers-color-scheme: dark)").matches ||
                document.documentElement.classList.contains("dark"))) ||
        false;

    const [isDark, setIsDark] = React.useState(getIsDark());

    React.useEffect(() => {
        const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
        const handler = () => setIsDark(getIsDark());

        mq?.addEventListener?.("change", handler);

        const obs = new MutationObserver(handler);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => {
            mq?.removeEventListener?.("change", handler);
            obs.disconnect();
        };
    }, []);

    return isDark ? DARK : LIGHT;
}

// rows: [{ resumeId, status, count, label? }, ...]
function pivot(rows: any[]) {
    const byKey: Record<string, Record<string, number>> = {};
    const statuses = new Set<string>();

    for (const r of rows) {
        const x =
            r.label ??
            (r.resumeId == null ? "Unassigned" : `Resume ${String(r.resumeId)}`);

        if (!byKey[x]) byKey[x] = {};
        byKey[x][r.status] = r.count;
        statuses.add(r.status);
    }

    const data = Object.entries(byKey).map(([x, obj]) => ({ x, ...obj }));
    return { data, statuses: Array.from(statuses) };
}

export function ResumeStatusGraph() {
    const [rows, setRows] = React.useState<any[] | null>(null);
    const [err, setErr] = React.useState<string | null>(null);
    const palette = usePalette();

    React.useEffect(() => {
        (async () => {
            try {
                const data = await listResumeStatusCounts();
                setRows(data ?? []);
            } catch (e: any) {
                setErr(e?.message || "Failed to load resume stats");
                setRows([]);
            }
        })();
    }, []);

    if (rows === null) return <div>Loading resume stats…</div>;
    if (err) return <div className="text-red-600">Error: {err}</div>;
    if (rows.length === 0) return <div>No resume status data…</div>;

    const { data, statuses } = pivot(rows);

    return (
        <div className="w-full">
            <h3 style={{ marginBottom: 8, fontWeight: 600 }}>Resume Status Breakdown</h3>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="x"
                        tickLine={false}
                        // Trim very long labels
                        tickFormatter={(t: string) => (t?.length > 22 ? `${t.slice(0, 21)}…` : t)}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    {statuses.map((s, i) => (
                        <Bar key={s} dataKey={s} stackId="a" fill={palette[i % palette.length]} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}