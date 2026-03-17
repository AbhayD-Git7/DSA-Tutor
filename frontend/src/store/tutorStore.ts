import { create } from 'zustand';
import type { ProblemAnalysis, UserProgress, Language } from '../types';

interface TutorStore {
  // Current analysis
  currentAnalysis: ProblemAnalysis | null;
  isAnalyzing: boolean;
  analysisError: string | null;

  // UI state
  selectedLanguage: Language;
  activeSection: string;

  // Progress
  userProgress: UserProgress | null;

  // History (session)
  history: ProblemAnalysis[];

  // Actions
  setAnalysis: (analysis: ProblemAnalysis) => void;
  setAnalyzing: (v: boolean) => void;
  setError: (err: string | null) => void;
  setLanguage: (lang: Language) => void;
  setActiveSection: (section: string) => void;
  setProgress: (progress: UserProgress) => void;
  addToHistory: (analysis: ProblemAnalysis) => void;
  clearCurrent: () => void;
}

export const useTutorStore = create<TutorStore>((set) => ({
  currentAnalysis: null,
  isAnalyzing: false,
  analysisError: null,
  selectedLanguage: 'java',
  activeSection: 'explanation',
  userProgress: null,
  history: [],

  setAnalysis: (analysis) =>
    set({ currentAnalysis: analysis, analysisError: null }),

  setAnalyzing: (v) => set({ isAnalyzing: v }),

  setError: (err) => set({ analysisError: err, isAnalyzing: false }),

  setLanguage: (lang) => set({ selectedLanguage: lang }),

  setActiveSection: (section) => set({ activeSection: section }),

  setProgress: (progress) => set({ userProgress: progress }),

  addToHistory: (analysis) =>
    set((state) => ({
      history: [analysis, ...state.history].slice(0, 20),
    })),

  clearCurrent: () =>
    set({ currentAnalysis: null, analysisError: null, activeSection: 'explanation' }),
}));