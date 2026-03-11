import React from 'react';

interface DocCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: string;
  accent?: string;
}

export default function DocCard({ title, description, href, icon, accent }: DocCardProps) {
  const card = (
    <div
      className="doc-card"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        transition: 'all 0.25s ease',
        cursor: href ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        minHeight: '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={href ? (e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
      } : undefined}
      onMouseLeave={href ? (e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      } : undefined}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {icon && <span style={{ fontSize: '1.3rem' }}>{icon}</span>}
        <strong
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.05rem',
            color: accent || '#ffcd00',
          }}
        >
          {title}
        </strong>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: '0.88rem',
          color: 'rgba(240, 239, 244, 0.6)',
          lineHeight: 1.5,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="doc-card-link" style={{ textDecoration: 'none', color: 'inherit', border: 'none' }}>
        {card}
      </a>
    );
  }

  return card;
}
