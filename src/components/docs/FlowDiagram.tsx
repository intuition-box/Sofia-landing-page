import React from 'react';

interface FlowStep {
  label: string;
  icon?: string;
  description?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  direction?: 'horizontal' | 'vertical';
}

export default function FlowDiagram({ steps, direction = 'horizontal' }: FlowDiagramProps) {
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: 'center',
        gap: '0',
        margin: '2rem 0',
        overflowX: isHorizontal ? 'auto' : 'visible',
        padding: '0.5rem 0',
      }}
    >
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          {/* Step box */}
          <div
            style={{
              background: 'rgba(255, 205, 0, 0.06)',
              border: '1px solid rgba(255, 205, 0, 0.2)',
              borderRadius: '10px',
              padding: '0.8rem 1.2rem',
              textAlign: 'center',
              minWidth: isHorizontal ? '120px' : 'auto',
              flex: isHorizontal ? '0 0 auto' : undefined,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {step.icon && (
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>
                {step.icon}
              </div>
            )}
            <div
              style={{
                fontWeight: 600,
                fontSize: '0.85rem',
                color: '#f0eff4',
              }}
            >
              {step.label}
            </div>
            {step.description && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(240, 239, 244, 0.5)',
                  marginTop: '0.25rem',
                }}
              >
                {step.description}
              </div>
            )}
          </div>

          {/* Arrow connector */}
          {i < steps.length - 1 && (
            <div
              style={{
                color: 'rgba(255, 205, 0, 0.4)',
                fontSize: '1.2rem',
                padding: isHorizontal ? '0 0.5rem' : '0.3rem 0',
                flexShrink: 0,
                fontFamily: 'monospace',
              }}
            >
              {isHorizontal ? '→' : '↓'}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
