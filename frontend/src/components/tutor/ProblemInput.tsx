import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAnalyze } from '../../hooks/useAnalyze';
import { useTutorStore } from '../../store/tutorStore';
import type { Language } from '../../types';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'java',       label: 'Java'       },
  { value: 'python',     label: 'Python'     },
  { value: 'javascript', label: 'JavaScript' },
];

const PLACEHOLDER = `Example:
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

Input: nums = [2,7,11,15], target = 9
Output: [0,1]`;

export function ProblemInput() {
  const [input, setInput] = useState('');
  const { analyze } = useAnalyze();
  const { isAnalyzing, selectedLanguage, setLanguage } = useTutorStore();

  const handleSubmit = () => analyze(input, selectedLanguage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#64748b', textTransform: 'uppercase' }}>
          Problem Statement
        </span>

        {/* Language selector */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '4px' }}>
          {LANGUAGES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setLanguage(value)}
              style={{
                padding: '5px 12px',
                borderRadius: '7px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                background: selectedLanguage === value ? '#7c3aed' : 'transparent',
                color: selectedLanguage === value ? '#fff' : '#64748b',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={PLACEHOLDER}
        rows={10}
        style={{
          width: '100%',
          background: '#0d0d16',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '14px',
          padding: '14px 16px',
          fontSize: '12px',
          color: '#cbd5e1',
          resize: 'none',
          outline: 'none',
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: '1.7',
        }}
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isAnalyzing || !input.trim()}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '13px',
          background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: isAnalyzing || !input.trim() ? 'not-allowed' : 'pointer',
          opacity: isAnalyzing || !input.trim() ? 0.4 : 1,
          transition: 'opacity 0.15s',
        }}
      >
        {isAnalyzing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Analyze Problem
          </>
        )}
      </button>
    </div>
  );
}