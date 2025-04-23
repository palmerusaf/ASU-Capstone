import { useEffect, useState, useRef } from "react";
import { getResumes } from "@/utils/db/localStorage";
import { render } from "jsonresume-theme-even";
import { Button } from "@/components/ui/button";

export function ResumeDisplay() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [html, setHtml] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    async function fetchResumes() {
      const data = await getResumes();
      if (Array.isArray(data) && data.length > 0) {
        const reversed = data.reverse(); // Latest first
        setResumes(reversed);
        setSelectedIndex(0);
      }
    }
    fetchResumes();
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && resumes.length > 0) {
      let rendered = render(resumes[selectedIndex]);
      rendered = rendered.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
      setHtml(rendered); // Render resume in JSON data with template for display
    }
  }, [selectedIndex, resumes]);

  const getNameOptions = () => {
    const nameCounts: Record<string, number> = {};
    const options = resumes
      .slice() // Clone array to preserve OG order
      .reverse() // Oldest to newest
      .map((resume, i, original) => {
        const name = resume.basics?.name || `Resume ${original.length - i}`;
        nameCounts[name] = (nameCounts[name] || 0) + 1;
        const suffix = nameCounts[name] > 1 ? ` ${nameCounts[name]}` : ""; //
        return { label: name + suffix, index: original.length - 1 - i }; // Adjust back to actual index
      });
    return options;
  };

  const handleExportJSON = () => {
    const json = resumes[selectedIndex];
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const nameOptions = getNameOptions();

  return (
    <div className="w-full p-6 space-y-6 flex flex-col items-center">
      <div className="w-full max-w-screen-lg flex justify-between items-center">
        <h2 className="text-xl font-semibold">Select Resume</h2>
        <select
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
          className="border rounded-md px-3 py-2 text-sm"
        >
          {nameOptions.map(({ label, index }) => (
            <option key={index} value={index}>{label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleExportJSON}>Export as JSON</Button>
      </div>

      {html ? (
        <div className="w-[900px] border rounded-lg overflow-hidden shadow bg-white">
          <iframe
            ref={iframeRef}
            title="resume-preview"
            className="w-full h-[1100px] border-none"
            srcDoc={html}
          />
        </div>
      ) : (
        <p className="text-center mt-8">Loading resume...</p>
      )}
    </div>
  );
}