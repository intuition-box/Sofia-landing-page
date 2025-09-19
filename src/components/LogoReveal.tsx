import React, { useState } from 'react';

interface LogoRevealProps {
  logoSrc: string;
  logoAlt: string;
  className?: string;
  onAnimationStart?: () => void;
}

export function LogoReveal({
  logoSrc,
  logoAlt,
  className = '',
  onAnimationStart
}: LogoRevealProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onAnimationStart?.();
  };

  // Dramatic scaling: from 1 to 6 when animating
  const logoScale = isAnimating ? 6 : 1;

  // Logo opacity: fades out when animating
  const logoOpacity = isAnimating ? 0 : 1;

  return (
    <div
      className={`logo-dive-container ${className}`}
      style={{
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        overflow: 'hidden',
        zIndex: isAnimating ? 5 : 15,
        pointerEvents: isAnimating ? 'none' : 'auto'
      }}
    >
      {/* Logo that scales on click */}
      <div
        className="logo-dive"
        onClick={handleClick}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          zIndex: 1,
          opacity: logoOpacity,
          transition: 'all 2s ease',
          transformOrigin: 'center center',
          cursor: 'pointer'
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
    </div>
  );
}