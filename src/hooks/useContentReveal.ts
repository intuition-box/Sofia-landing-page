import { useEffect, useState } from 'react';

export function useContentReveal() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show content when user has scrolled past the logo effect (after 1.5 viewport heights)
      const revealThreshold = windowHeight * 1.5;

      if (scrollY >= revealThreshold) {
        setShowContent(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return showContent;
}