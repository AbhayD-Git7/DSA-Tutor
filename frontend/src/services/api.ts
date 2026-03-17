import type { AnalyzeRequest, ApiResponse, DSAPattern, ProblemAnalysis, UserProgress } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ─── Problem Analysis ─────────────────────────────────────────────────────────
export const analyzeProblem = (body: AnalyzeRequest) =>
  request<ProblemAnalysis>('/api/problems/analyze', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const getAnalysisById = (id: string) =>
  request<ProblemAnalysis>(`/api/problems/${id}`);

export const markProblemComplete = (id: string) =>
  request<void>(`/api/problems/${id}/complete`, { method: 'POST' });

// ─── Patterns ─────────────────────────────────────────────────────────────────
export const getAllPatterns = () =>
  request<DSAPattern[]>('/api/patterns');

export const getPatternProblems = (patternId: string) =>
  request<ProblemAnalysis[]>(`/api/patterns/${patternId}/problems`);

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const getUserProgress = () =>
  request<UserProgress>('/api/dashboard/progress');

export const getDailyChallenge = () =>
  request<ProblemAnalysis>('/api/daily-challenge');