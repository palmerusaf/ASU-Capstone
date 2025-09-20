import { calculateCosineSimilarity } from "@/utils/extractKeywords";


export function TestPage() {
  const [jobText, setJobText] = useState("");
  const [resumeText, setResumeText] = useState("");

  const score =
    jobText && resumeText ? calculateCosineSimilarity(jobText, resumeText) : null;

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>Resume vs Job Similarity</h2>

      <div>
        <h3>Job Description</h3>
        <textarea
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          rows={6}
          cols={50}
        />
      </div>

      <div>
        <h3>Resume Text</h3>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={6}
          cols={50}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Similarity Score: </strong>
        {score !== null ? score.toFixed(3) : "Enter both texts"}
      </div>
    </div>
  );
}