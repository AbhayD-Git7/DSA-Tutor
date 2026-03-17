import { useTutorStore } from '../../store/tutorStore';
import type { ProblemAnalysis } from '../../types';
import { ComplexityBadge, CodeBlock } from './ComplexityBadge';
import {
  BookOpen, Cpu, Zap, AlertTriangle,
  Code2, Lightbulb, ChevronRight, Target
} from 'lucide-react';

const SECTIONS = [
  { id: 'explanation',    label: 'Explanation',    icon: BookOpen      },
  { id: 'pattern',        label: 'Pattern',        icon: Target        },
  { id: 'bruteForce',     label: 'Brute Force',    icon: Cpu           },
  { id: 'optimal',        label: 'Optimal',        icon: Zap           },
  { id: 'edgeCases',      label: 'Edge Cases',     icon: AlertTriangle },
  { id: 'code',           label: 'Code',           icon: Code2         },
  { id: 'interviewTips',  label: 'Interview Tips', icon: Lightbulb     },
];

const DIFFICULTY_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  Easy:   { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.2)'  },
  Medium: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)'  },
  Hard:   { color: '#fb7185', bg: 'rgba(251,113,133,0.1)', border: 'rgba(251,113,133,0.2)' },
};

export function AnalysisResult({ analysis }: { analysis: ProblemAnalysis }) {
  const { activeSection, setActiveSection, selectedLanguage } = useTutorStore();
  const diffStyle = DIFFICULTY_STYLES[analysis.difficulty] || DIFFICULTY_STYLES.Medium;

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Section nav */}
      <div style={{ width: '160px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {/* Difficulty badge */}
        <div style={{
          textAlign: 'center', fontSize: '10px', fontWeight: 800,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '5px', borderRadius: '8px', margin: '0 4px 12px',
          color: diffStyle.color, background: diffStyle.bg, border: `1px solid ${diffStyle.border}`
        }}>
          {analysis.difficulty}
        </div>

        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 10px', borderRadius: '9px',
              fontSize: '11px', cursor: 'pointer',
              border: 'none', background: 'none', fontFamily: 'inherit',
              textAlign: 'left', transition: 'all 0.15s',
              color: activeSection === id ? '#c4b5fd' : '#64748b',
              backgroundColor: activeSection === id ? 'rgba(124,58,237,0.15)' : 'transparent',
            }}
          >
            <Icon size={13} />
            <span>{label}</span>
            {activeSection === id && <ChevronRight size={11} style={{ marginLeft: 'auto' }} />}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {activeSection === 'explanation' && (
          <>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Problem Explanation</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.75' }}>{analysis.explanation?.simple}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[{ label: 'Input', value: analysis.explanation?.inputDescription }, { label: 'Output', value: analysis.explanation?.outputDescription }].map(({ label, value }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '12px' }}>
                  <p style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{label}</p>
                  <p style={{ fontSize: '12px', color: '#e2e8f0' }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px' }}>
              <p style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Step-by-Step Example</p>
              <p style={{ fontSize: '11px', color: '#67e8f9', fontFamily: 'monospace', marginBottom: '4px' }}>Input: {analysis.explanation?.example?.input}</p>
              <p style={{ fontSize: '11px', color: '#6ee7b7', fontFamily: 'monospace', marginBottom: '12px' }}>Output: {analysis.explanation?.example?.output}</p>
              <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {analysis.explanation?.example?.steps?.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
                    <span style={{ color: '#7c3aed', fontFamily: 'monospace', fontSize: '11px' }}>{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}

        {activeSection === 'pattern' && (
          <>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Pattern Identification</h2>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '28px' }}>{analysis.pattern?.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>{analysis.pattern?.name}</p>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>{analysis.pattern?.problemCount} problems in this pattern</p>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>{analysis.pattern?.description}</p>
            </div>
          </>
        )}

        {activeSection === 'bruteForce' && (
          <>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Brute Force Approach</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.75' }}>{analysis.bruteForce?.logic}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <ComplexityBadge type="time"  value={analysis.bruteForce?.timeComplexity}  />
              <ComplexityBadge type="space" value={analysis.bruteForce?.spaceComplexity} />
            </div>
            {analysis.bruteForce?.whyInefficient && (
              <div style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.18)', borderRadius: '12px', padding: '14px' }}>
                <p style={{ fontSize: '11px', color: '#fb7185', fontWeight: 700, marginBottom: '6px' }}>⚠ Why It's Inefficient</p>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>{analysis.bruteForce.whyInefficient}</p>
              </div>
            )}
          </>
        )}

        {activeSection === 'optimal' && (
          <>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Optimal Approach</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.75' }}>{analysis.optimal?.logic}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <ComplexityBadge type="time"  value={analysis.optimal?.timeComplexity}  />
              <ComplexityBadge type="space" value={analysis.optimal?.spaceComplexity} />
            </div>
          </>
        )}

        {activeSection === 'edgeCases' && (
          <>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Edge Cases</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {analysis.edgeCases?.map((ec, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
                  <span style={{ color: '#f59e0b' }}>◆</span>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>{ec}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === 'code' && (
          <>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Code Implementation</h2>
            <CodeBlock
              code={analysis.codeImplementation?.[selectedLanguage] || '// No code available'}
              language={selectedLanguage}
            />
          </>
        )}

        {activeSection === 'interviewTips' && (
          <>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Interview Tips</h2>
            <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)', borderRadius: '12px', padding: '14px' }}>
              <p style={{ fontSize: '11px', color: '#c4b5fd', fontWeight: 700, marginBottom: '6px' }}>💬 How to Explain</p>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>{analysis.interviewTips?.howToExplain}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Common Mistakes</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {analysis.interviewTips?.commonMistakes?.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                    <span style={{ color: '#fb7185' }}>✗</span> {m}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}