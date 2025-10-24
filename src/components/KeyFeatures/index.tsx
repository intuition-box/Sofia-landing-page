import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './index.module.css';

const features = [
  {
    id: 2,
    title: 'Signals On-Chain',
    description: 'Visualize all your on-chain data in real time. Every signal is stored transparently on the blockchain.',
    image: '/img/sofiascreen/2.png',
  },
  {
    id: 3,
    title: 'Add Signal to a Bookmark',
    description: 'Save and share your favorite signals with your Trust Circles. Curate the content that truly matters to you.',
    image: '/img/sofiascreen/3.png',
  },
  {
    id: 9,
    title: 'Bookmark Manager',
    description: 'Organize, edit, and share your bookmarks seamlessly with your Trust Circles for collaborative discovery.',
    image: '/img/sofiascreen/9.png',
  },
  {
    id: 4,
    title: 'Wheel of Choice',
    description: 'Access Sofia’s main tools instantly through an intuitive, playful interface designed for fast decisions.',
    image: '/img/sofiascreen/4.png',
  },
  {
    id: 5,
    title: 'Follow your Friends',
    description: 'Stay connected with your network. Follow your friends to explore their signals and discover new perspectives.',
    image: '/img/sofiascreen/5.png',
  },
  {
    id: 6,
    title: 'Sofia Result',
    description: 'In the Echoes tab, discover Sofia’s insights generated from your browsing activity and on-chain interactions.',
    image: '/img/sofiascreen/6.png',
  },
  {
    id: 7,
    title: 'Choose the Weight of an Echo',
    description: 'Adjust the weight of each Echo to define its impact on your knowledge graph. Shape your data with precision.',
    image: '/img/sofiascreen/7.png',
  },
  {
    id: 8,
    title: 'AI Chat Embedded',
    description: 'Interact directly with Sofia’s embedded AI. Ask questions, get context-aware answers, and explore smarter paths.',
    image: '/img/sofiascreen/8.png',
  },
  {
    id: 11,
    title: 'Resonance Results',
    description: 'Resonance analyzes your on-chain signals and suggests relevant websites aligned with your digital footprint.',
    image: '/img/sofiascreen/11.png',
  },
  {
    id: 12,
    title: 'Pulse Analysis',
    description: 'Pulse captures all your open tabs into a single view, keeping a record of your recent explorations and focus zones.',
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
