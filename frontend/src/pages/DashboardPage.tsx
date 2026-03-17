import { useEffect } from 'react';
import { getUserProgress } from '../services/api';
import { useTutorStore } from '../store/tutorStore';

export function DashboardPage() {
  const { userProgress, setProgress } = useTutorStore();

  useEffect(() => {
    getUserProgress().then((r) => setProgress(r.data)).catch(console.error);
  }, [setProgress]);

  if (!userProgress) {
    return (
      <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ height: '110px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s ease-in-out infinite' }} />
        ))}
      </div>
    );
  }

  const DIFF = {
    Easy:   { color: '#34d399', bar: '#10b981' },
    Medium: { color: '#fbbf24', bar: '#f59e0b' },
    Hard:   { color: '#fb7185', bar: '#f43f5e' },
  };

  const total = userProgress.easyCount + userProgress.mediumCount + userProgress.hardCount;

  return (
    <div style={{ padding: '24px', overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Your Progress</h1>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
        {[
          { icon: '✅', label: 'Total Solved', value: userProgress.totalSolved },
          { icon: '🔥', label: 'Day Streak',   value: `${userProgress.streakDays}` },
          { icon: '🏆', label: 'Hard Solved',  value: userProgress.hardCount },
          { icon: '⬡',  label: 'Patterns',     value: userProgress.patternBreakdown.length },
        ].map(({ icon, label, value }) => (
          <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>{icon}</div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff' }}>{value}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Difficulty breakdown */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
        <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Difficulty Breakdown</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(['Easy', 'Medium', 'Hard'] as const).map((d) => {
            const count = d === 'Easy' ? userProgress.easyCount : d === 'Medium' ? userProgress.mediumCount : userProgress.hardCount;
            const pct = total > 0 ? (count / total) * 100 : 0;
            return (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: DIFF[d].color, width: '52px' }}>{d}</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: DIFF[d].bar, borderRadius: '99px', transition: 'width 0.5s' }} />
                </div>
                <span style={{ fontSize: '11px', color: '#64748b', width: '20px', textAlign: 'right' }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern progress */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
        <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Pattern Progress</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {userProgress.patternBreakdown.map(({ pattern, solved, total: t, percentage }) => (
            <div key={pattern.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '18px' }}>{pattern.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '11px', color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pattern.name}</p>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '99px', marginTop: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg,#7c3aed,#22d3ee)', borderRadius: '99px' }} />
                </div>
              </div>
              <span style={{ fontSize: '10px', color: '#64748b', flexShrink: 0 }}>{solved}/{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      {userProgress.recentActivity.length > 0 && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Recent Activity</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {userProgress.recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < userProgress.recentActivity.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div>
                  <p style={{ fontSize: '13px', color: '#e2e8f0' }}>{a.problemName}</p>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>{a.pattern} · {a.date}</p>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px',
                  color: DIFF[a.difficulty as keyof typeof DIFF]?.color || '#94a3b8',
                  background: 'rgba(255,255,255,0.05)',
                }}>
                  {a.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}