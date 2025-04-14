import { useEffect, useState } from "react";
import { getResumes } from "@/utils/db/localStorage";
import { render } from "jsonresume-theme-even";

export function ResumeDisplay() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function fetchResume() {
      const resumes = await getResumes();
      const latest = resumes.at(-1);
      if (latest) {
        const rendered = render(latest);
        setHtml(rendered);
      }
    }

    fetchResume();
  }, []);

  if (!html) return <p className="text-center mt-8">Loading resume...</p>;

  return (
    <iframe
      title="resume-preview"
      className="w-full h-screen border-none"
      srcDoc={html}
    />
  );
}