import Similarity from 'compute-cosine-similarity';

const STOP = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'i',
  'in',
  'is',
  'it',
  'me',
  'my',
  'of',
  'on',
  'or',
  'that',
  'the',
  'this',
  'to',
  'was',
  'were',
  'with',
]);
export function extractKeywords(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const raw of text.toLowerCase().split(/[^a-z0-9+#.]+/g)) {
    const w = raw.trim();
    if (!w || STOP.has(w) || w.length < 2) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return counts;
}

export function getTopNKeywords({
  keywordMap: counts,
  numKeywords,
}: {
  keywordMap: Map<string, number>;
  numKeywords: number;
}): string[] {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, numKeywords)
    .map(([k]) => k);
}

export function calculateCosineSimilarity(
  jobDescription: string,
  resumeText: string
) {
  // Extract keywords
  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);

  // Combine all keywords
  const keywords = new Set([...jobKeywords.keys(), ...resumeKeywords.keys()]);

  // Vector to be used to calculate cosine similarity score
  const jobArray: number[] = [];
  const resumeArray: number[] = [];

  // Populate array with number of occurences of keyword in resume and job description
  // Note: Number of occurences does not actually matter when calculating cosineSimilarity.
  for (const word of keywords) {
    jobArray.push(jobKeywords.get(word) ?? 0);
    resumeArray.push(resumeKeywords.get(word) ?? 0);
  }

  // If an array is empty due to STOP words, return 0 instead.
  if (
    jobArray.every((occurance) => occurance === 0) ||
    resumeArray.every((occurance) => occurance === 0)
  ) {
    return 0;
  }

  // Calculate similarity score
  const similarity = Similarity(jobArray, resumeArray) || 0;
  return Math.floor(similarity * 100);
}
