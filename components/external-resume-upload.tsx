import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addResume } from "@/utils/db/localStorage";
import { textToJsonResume } from "@/utils/textToJsonResume";
import { addRawResume } from '@/utils/db/rawResumes.ts';
import { extractKeywords, getTopNKeywords } from "@/utils/extractKeywords";

export default function ResumePasteForm() {
  const [text, setText] = useState("");
  const keywords = useMemo(() => getTopNKeywords({ keywordMap: extractKeywords(text), numKeywords: 25 }), [text]);

  async function handleSave() {
    if (text.trim().length < 30) {
      toast.error("Paste at least a few lines of resume text.");
      return;
    }
    try {
      const json = textToJsonResume(text);
      await addResume(json);       // same localStorage method used by regular resume upload - for display
      const name = json?.basics?.name || "Pasted Resume";
      addRawResume({ name, rawText: text, source: "paste", jsonId: null }); // Raw resume save
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
        onChange={(e) => setText(e.target.value)}
      />
      <div className="text-sm opacity-70">Detected keywords (preview):</div>
      <div className="flex flex-wrap gap-2 text-xs">
        {keywords.map(k => <span key={k} className="px-2 py-1 rounded border">{k}</span>)}
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={() => setText("")}>Clear</Button>
      </div>
    </div>
  );
}
