import React from 'react';

interface StatBoxProps {
  value: string;
  label: string;
  icon?: string;
}

export default function StatBox({ value, label, icon }: StatBoxProps) {
  return (
    <div
      className="stat-box"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '1.2rem',
        textAlign: 'center',
        fontFamily: "'Montserrat', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {icon && <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{icon}</div>}
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem',
          fontWeight: 700,
          color: '#ffcd00',
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '0.78rem',
          color: 'rgba(240, 239, 244, 0.5)',
          marginTop: '0.35rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </div>
    </div>
  );
}
