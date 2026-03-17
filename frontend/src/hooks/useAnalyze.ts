import { useCallback } from 'react';
import { analyzeProblem } from '../services/api';
import { useTutorStore } from '../store/tutorStore';
import type { Language } from '../types';

export function useAnalyze() {
  const { setAnalysis, setAnalyzing, setError, addToHistory, selectedLanguage } =
    useTutorStore();

  const analyze = useCallback(
    async (problemStatement: string, language: Language = selectedLanguage) => {
      if (!problemStatement.trim()) return;

      setAnalyzing(true);
      setError(null);

      try {
        const response = await analyzeProblem({ problemStatement, language });
        setAnalysis(response.data);
        addToHistory(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Analysis failed. Try again.');
      } finally {
        setAnalyzing(false);
      }
    },
    [selectedLanguage, setAnalysis, setAnalyzing, setError, addToHistory]
  );

  return { analyze };
}