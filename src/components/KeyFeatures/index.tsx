import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './index.module.css';

const features = [
  {
    id: 2,
    title: 'Signals On-Chain',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/img/sofiascreen/2.png',
  },
  {
    id: 3,
    title: 'Add Signal to a Bookmark',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/img/sofiascreen/3.png',
  },
  {
    id: 4,
    title: 'Wheel of Choice',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '/img/sofiascreen/4.png',
  },
  {
    id: 5,
    title: 'Follow your Friends',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    image: '/img/sofiascreen/5.png',
  },
  {
    id: 6,
    title: 'Sofia Result',
    description: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.',
    image: '/img/sofiascreen/6.png',
  },
  {
    id: 7,
    title: 'Choose the weight of an echoe',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    image: '/img/sofiascreen/7.png',
  },
  {
    id: 8,
    title: 'AI Chat embedded',
    description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    image: '/img/sofiascreen/8.png',
  },
  {
    id: 9,
    title: 'Bookmark manager',
    description: 'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    image: '/img/sofiascreen/9.png',
  },
  {
    id: 10,
    title: 'Clear Homepage',
    description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea.',
    image: '/img/sofiascreen/10.png',
  },
  {
    id: 11,
    title: 'Resonance Results',
    description: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    image: '/img/sofiascreen/11.png',
  },
  {
    id: 12,
    title: 'Pulse Analysis',
    description: 'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur, at vero eos et accusamus et iusto odio dignissimos.',
    image: '/img/sofiascreen/12.png',
  },
];

export default function KeyFeatures(): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate through images every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentFeature = features[currentIndex];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Key Features</h2>

        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.id}
              className={styles.featureCard}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.cardContent}>
                {/* Left - Text */}
                <div className={styles.textContent}>
                  <h3 className={styles.featureTitle}>{currentFeature.title}</h3>
                  <p className={styles.featureDescription}>
                    {currentFeature.description}
                  </p>
                </div>

                {/* Right - Image */}
                <div className={styles.imageContent}>
                  <img
                    src={currentFeature.image}
                    alt={currentFeature.title}
                    className={styles.featureImage}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

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
    </section>
  );
}
