import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lightbox from '@site/src/components/Lightbox';
import styles from './index.module.css';

const features = [
  { id: 1, image: '/img/sofiascreen/Workspace-Sofia/hero-v1.png' },
  { id: 2, image: '/img/sofiascreen/Workspace-Sofia/connectsocials.png' },
  { id: 3, image: '/img/sofiascreen/Workspace-Sofia/rightwhereyoubrowse.png' },
  { id: 4, image: '/img/sofiascreen/Workspace-Sofia/trendings.png' },
  { id: 5, image: '/img/sofiascreen/Workspace-Sofia/proofofaction.png' },
  { id: 6, image: '/img/sofiascreen/Workspace-Sofia/verifiedonchain.png' },
  { id: 7, image: '/img/sofiascreen/Workspace-Sofia/connectwithfriends.png' },
];

const lightboxImages = features.map((f) => ({
  src: f.image,
  alt: `Sofia Screenshot ${f.id}`,
}));

export default function KeyFeatures(): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Auto-rotate through images every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentFeature = features[currentIndex];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Sofia is a Chromium extension that turns your web activity into a verifiable, rewarded on-chain identity.</h2>

        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.slideContainer}>
            <AnimatePresence initial={false}>
              <motion.div
                key={currentFeature.id}
                className={styles.featureCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.cardContent}>
                  <div
                    className={styles.imageContent}
                    onClick={() => {
                      setLightboxIndex(currentIndex);
                      setLightboxOpen(true);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={currentFeature.image}
                      alt={`Sofia Screenshot ${currentFeature.id}`}
                      className={styles.featureImage}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className={styles.carouselIndicators}>
            {features.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((i) => (i === 0 ? features.length - 1 : i - 1))}
          onNext={() => setLightboxIndex((i) => (i === features.length - 1 ? 0 : i + 1))}
        />
      )}
    </section>
  );
}
