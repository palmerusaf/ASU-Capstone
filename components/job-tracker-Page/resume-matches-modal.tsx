import { useEffect, useMemo, useState } from "react";
import { listResumes } from "@/utils/db/resumes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    userId?: string | null;
    onRunMatches?: (params: { resumeId: number; name: string; json: any }) => void;
};

export function ResumeMatchesModal({ open, onOpenChange, userId = null, onRunMatches }: Props) {
    const [rows, setRows] = useState<Array<{ id: number; name: string; json: any }>>([]);
    const [selectedId, setSelectedId] = useState<string>(""); // keep string for <Select>
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        let cancelled = false;

        (async () => {
            try {
                setError(null);
                const data = await listResumes(userId);
                if (!cancelled) {
                    setRows(data as any);
                    setSelectedId(data?.[0]?.id?.toString?.() ?? "");
                }
            } catch (e: any) {
                if (!cancelled) setError(e?.message || "Failed to load resumes.");
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [open, userId]);

    const selected = useMemo(
        () => rows.find(r => r.id.toString() === selectedId) ?? null,
        [rows, selectedId]
    );

    function handleRun() {
        if (!selected) return;
        onRunMatches?.({ resumeId: selected.id, name: selected.name, json: selected.json });
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Match jobs using a saved resume</DialogTitle>
                </DialogHeader>

                {error ? (
                    <div className="p-2 text-sm text-red-600">{error}</div>
                ) : rows.length === 0 ? (
                    <div className="p-2 text-sm opacity-70">No resumes saved yet.</div>
                ) : (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium">Choose resume</label>
                        <Select value={selectedId} onValueChange={setSelectedId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a resume" />
                            </SelectTrigger>
                            <SelectContent>
                                {rows.map(r => (
                                    <SelectItem key={r.id} value={r.id.toString()}>
                                        {r.name} <span className="opacity-60">#{r.id}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleRun} disabled={!selected}>Run matches</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}