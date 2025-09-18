import React from 'react';
import { useScrollTrigger } from '../hooks/useScrollTrigger';

interface LogoRevealProps {
  logoSrc: string;
  logoAlt: string;
  className?: string;
}

export function LogoReveal({
  logoSrc,
  logoAlt,
  className = ''
}: LogoRevealProps) {
  const { scrollProgress, isTriggered } = useScrollTrigger();

  // Dramatic scaling: from 1 to 6
  const logoScale = 1 + scrollProgress * 5;

  // Logo opacity: fades out completely at 80% progress
  const logoOpacity = scrollProgress < 0.8 ? 1 : Math.max(0, 1 - (scrollProgress - 0.8) / 0.2);

  return (
    <div
      className={`logo-dive-container ${className}`}
      style={{
        minHeight: '200vh', // Extra height for scroll space
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Fixed logo that scales */}
      <div
        className="logo-dive"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          zIndex: 10,
          opacity: logoOpacity,
          transition: isTriggered ? 'none' : 'all 0.3s ease',
          transformOrigin: 'center center'
        }}
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          style={{
            width: '200px',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      {/* Spacer to ensure scroll space */}
      <div style={{ height: '200vh' }} />
    </div>
  );
}