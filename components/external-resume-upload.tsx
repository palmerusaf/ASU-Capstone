import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addResume } from "@/utils/db/localStorage";
import { textToJsonResume } from "@/utils/textToJsonResume";

const STOP = new Set(["a","an","and","the","or","to","of","for","in","on","with","at","by","from","as","is","are","be","this","that","it","was","were","i","me","my"]);
function extractKeywords(text: string) {
  const counts = new Map<string, number>();
  for (const raw of text.toLowerCase().split(/[^a-z0-9+#.]+/g)) {
    const w = raw.trim();
    if (!w || STOP.has(w) || w.length < 2) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0, 25).map(([k])=>k);
}

export default function ResumePasteForm() {
  const [text, setText] = useState("");
  const keywords = useMemo(() => extractKeywords(text), [text]);

  async function handleSave() {
    if (text.trim().length < 30) {
      toast.error("Paste at least a few lines of resume text.");
      return;
    }
    try {
      const json = textToJsonResume(text);
      await addResume(json);       // same localStorage method used by regular resume upload
      toast.success("Pasted resume saved!");
      setText("");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save pasted resume.");
    }
  }

  return (
    <div className="space-y-3 p-4 rounded-2xl border">
      <h2 className="text-xl font-semibold">Paste external resume (plain text)</h2>
      <textarea
        className="w-full h-48 p-3 rounded border"
        placeholder="Paste plain text from PDF/Word here…"
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />
      <div className="text-sm opacity-70">Detected keywords (preview):</div>
      <div className="flex flex-wrap gap-2 text-xs">
        {keywords.map(k => <span key={k} className="px-2 py-1 rounded border">{k}</span>)}
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={()=>setText("")}>Clear</Button>
      </div>
    </div>
  );
}