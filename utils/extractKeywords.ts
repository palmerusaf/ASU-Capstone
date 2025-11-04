import Similarity from 'compute-cosine-similarity';
import { removeStopwords } from 'stopword';

const importantKeyWords = new Set([
  'net',
  'ai',
  'algorithm',
  'analytics',
  'angular',
  'ansible',
  'api',
  'architecture',
  'aspnet',
  'automation',
  'aws',
  'azure',
  'c#',
  'c',
  'c++',
  'cd',
  'ci',
  'css',
  'cybersecurity',
  'data',
  'distributed',
  'django',
  'docker',
  'express',
  'fastapi',
  'flask',
  'gcp',
  'git',
  'go',
  'graphql',
  'html',
  'java',
  'javascript',
  'jenkins',
  'jwt',
  'kotlin',
  'kubernetes',
  'laravel',
  'learning',
  'machine',
  'microservices',
  'ml',
  'mongodb',
  'mysql',
  'next',
  'node',
  'numpy',
  'nuxt',
  'oauth',
  'pandas',
  'performance',
  'php',
  'pipeline',
  'postgresql',
  'python',
  'pytorch',
  'rails',
  'react',
  'redis',
  'ruby',
  'rust',
  'scalability',
  'serverless',
  'spring',
  'sql',
  'sqlite',
  'svelte',
  'swift',
  'system',
  'tailwind',
  'tensorflow',
  'terraform',
  'testing',
  'typescript',
  'ui',
  'ux',
  'vue',
]);
export function extractKeywords(text: string): Map<string, number> {
  const counts = new Map<string, number>();

  for (const word of removeStopwords(text.toLowerCase().split(/[^a-z0-9+]+/))) {
    if (!word || word.length < 2) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  // scale count for important keywords
  for (const [word, count] of counts) {
    if (importantKeyWords.has(word)) counts.set(word, count * 6);
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
  return Math.round(similarity * 100);
}
