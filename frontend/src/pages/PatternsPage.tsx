import { useEffect, useState } from 'react';
import { getAllPatterns } from '../services/api';
import type { DSAPattern } from '../types';

export function PatternsPage() {
  const [patterns, setPatterns] = useState<DSAPattern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPatterns()
      .then((r) => setPatterns(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '24px', overflowY: 'auto', height: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>DSA Patterns</h1>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Master these patterns to solve 90% of interview problems.</p>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ height: '140px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {patterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      )}
    </div>
  );
}

function PatternCard({ pattern }: { pattern: DSAPattern }) {
  const [hovered, setHovered] = useState(false);
  const pct = pattern.problemCount > 0
    ? Math.round((pattern.solvedCount / pattern.problemCount) * 100)
    : 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '20px',
        borderRadius: '16px',
        border: `1px solid ${hovered ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.07)'}`,
        background: hovered ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.03)',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <span style={{ fontSize: '26px' }}>{pattern.icon}</span>
        <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
          {pattern.solvedCount}/{pattern.problemCount}
        </span>
      </div>

      <p style={{ fontWeight: 700, fontSize: '13px', color: '#fff', marginBottom: '4px' }}>{pattern.name}</p>
      <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5', marginBottom: '12px' }}>{pattern.description}</p>

      {/* Progress bar */}
      <div style={{ height: '3px', borderRadius: '99px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #7c3aed, #22d3ee)', borderRadius: '99px', transition: 'width 0.3s' }} />
      </div>
      <p style={{ fontSize: '9px', color: '#334155', marginTop: '4px' }}>{pct}% complete</p>
    </div>
  );
}