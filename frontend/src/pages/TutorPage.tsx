import { useTutorStore } from '../store/tutorStore';
import { ProblemInput } from '../components/tutor/ProblemInput';
import { AnalysisResult } from '../components/tutor/AnalysisResult';
import { AlertCircle, X } from 'lucide-react';

export function TutorPage() {
  const { currentAnalysis, isAnalyzing, analysisError, history, setAnalysis, clearCurrent } =
    useTutorStore();

  const showResult = currentAnalysis && !isAnalyzing;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>AI Problem Tutor</h1>
          <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Paste any problem. Get a complete breakdown.</p>
        </div>
        {history.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{history.length} analyzed this session</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {history.slice(0, 5).map((h, i) => (
                <button
                  key={h.id}
                  title={h.problemStatement?.slice(0, 60)}
                  onClick={() => setAnalysis(h)}
                  style={{
                    width: '24px', height: '24px', borderRadius: '6px',
                    background: 'rgba(255,255,255,0.08)', border: 'none',
                    color: '#94a3b8', fontSize: '10px', cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left panel */}
        <div style={{
          width: showResult ? '340px' : '100%',
          maxWidth: showResult ? '340px' : '600px',
          margin: showResult ? '0' : '0 auto',
          borderRight: showResult ? '1px solid rgba(255,255,255,0.07)' : 'none',
          padding: '20px',
          overflowY: 'auto',
          flexShrink: 0,
          transition: 'width 0.3s',
        }}>
          <ProblemInput />

          {/* Error */}
          {analysisError && (
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'flex-start', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '12px', padding: '14px' }}>
              <AlertCircle size={15} color="#fb7185" style={{ marginTop: '1px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: '#fda4af' }}>{analysisError}</p>
            </div>
          )}

          {/* Skeleton */}
          {isAnalyzing && (
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[80, 60, 90, 50, 70].map((w, i) => (
                <div key={i} style={{ height: '10px', borderRadius: '99px', background: 'rgba(255,255,255,0.07)', width: `${w}%`, animation: 'pulse 1.5s ease-in-out infinite' }} />
              ))}
            </div>
          )}
        </div>

        {/* Right panel */}
        {showResult && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 16px' }}>
              <button
                onClick={clearCurrent}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#475569', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <X size={12} /> Clear
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <AnalysisResult analysis={currentAnalysis} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}