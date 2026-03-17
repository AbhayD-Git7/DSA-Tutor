// ─── Problem & Analysis ───────────────────────────────────────────────────────

export interface ProblemAnalysis {
  id: string;
  problemStatement: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: DSAPattern;
  explanation: ProblemExplanation;
  bruteForce: Approach;
  optimal: Approach;
  edgeCases: string[];
  codeImplementation: CodeImplementation;
  interviewTips: InterviewTips;
  createdAt: string;
}

export interface ProblemExplanation {
  simple: string;
  inputDescription: string;
  outputDescription: string;
  example: StepByStepExample;
}

export interface StepByStepExample {
  input: string;
  output: string;
  steps: string[];
}

export interface Approach {
  logic: string;
  timeComplexity: string;
  spaceComplexity: string;
  whyInefficient?: string;
}

export interface CodeImplementation {
  java: string;
  python: string;
  javascript: string;
}

export interface InterviewTips {
  howToExplain: string;
  commonMistakes: string[];
}

// ─── DSA Patterns ─────────────────────────────────────────────────────────────

export interface DSAPattern {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  problemCount: number;
  solvedCount: number;
  examples: string[];
}

export interface PatternEmbedding {
  patternId: string;
  embedding: number[];
  keywords: string[];
}

// ─── Progress & Analytics ─────────────────────────────────────────────────────

export interface UserProgress {
  totalSolved: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  streakDays: number;
  lastActivity: string;
  patternBreakdown: PatternProgress[];
  recentActivity: ActivityEntry[];
}

export interface PatternProgress {
  pattern: DSAPattern;
  solved: number;
  total: number;
  percentage: number;
}

export interface ActivityEntry {
  date: string;
  problemName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  timeTaken: number;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface AnalyzeRequest {
  problemStatement: string;
  language?: 'java' | 'python' | 'javascript';
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  cached?: boolean;
}

export type Language = 'java' | 'python' | 'javascript';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';