import { NavLink } from 'react-router-dom';
import { Brain, LayoutGrid, BarChart3, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { to: '/',          icon: Brain,      label: 'Tutor'    },
  { to: '/patterns',  icon: LayoutGrid, label: 'Patterns' },
  { to: '/dashboard', icon: BarChart3,  label: 'Progress' },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#09090f', color: '#e2e8f0', fontFamily: "'Syne', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.07)', background: '#0d0d16', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #7c3aed, #22d3ee)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="white" />
          </div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', color: '#fff', textTransform: 'uppercase' }}>DSA</p>
            <p style={{ fontSize: '9px', color: '#64748b', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '1px' }}>Tutor AI</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '10px',
                fontSize: '13px',
                cursor: 'pointer',
                textDecoration: 'none',
                border: '1px solid',
                transition: 'all 0.15s',
                color: isActive ? '#c4b5fd' : '#64748b',
                background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
                borderColor: isActive ? 'rgba(124,58,237,0.2)' : 'transparent',
              })}
            >
              <Icon size={17} />
              <span style={{ letterSpacing: '0.05em' }}>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: '10px', color: '#334155', lineHeight: '1.6' }}>
            Paste any LeetCode-style problem to get a full AI breakdown.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}