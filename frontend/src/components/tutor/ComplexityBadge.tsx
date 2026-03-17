import { Clock, Database, Copy, Check } from 'lucide-react';
import { useState } from 'react';

// ─── Complexity Badge ─────────────────────────────────────────────────────────

interface ComplexityBadgeProps {
  type: 'time' | 'space';
  value: string;
}

export function ComplexityBadge({ type, value }: ComplexityBadgeProps) {
  const isTime = type === 'time';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '7px 14px',
      borderRadius: '10px',
      fontSize: '12px',
      fontFamily: "'JetBrains Mono', monospace",
      background: isTime ? 'rgba(34,211,238,0.08)' : 'rgba(124,58,237,0.08)',
      border: `1px solid ${isTime ? 'rgba(34,211,238,0.2)' : 'rgba(124,58,237,0.2)'}`,
      color: isTime ? '#67e8f9' : '#c4b5fd',
    }}>
      {isTime ? <Clock size={13} /> : <Database size={13} />}
      <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'Syne, sans-serif' }}>
        {isTime ? 'Time' : 'Space'}
      </span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}

// ─── Code Block ───────────────────────────────────────────────────────────────

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{ fontSize: '9px', color: '#64748b', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            color: copied ? '#34d399' : '#64748b',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <pre style={{
        overflowX: 'auto',
        padding: '16px',
        fontSize: '12px',
        color: '#94a3b8',
        fontFamily: "'JetBrains Mono', monospace",
        lineHeight: '1.8',
        background: '#06060d',
        margin: 0,
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}