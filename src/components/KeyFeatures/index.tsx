import React from 'react';
import styles from './index.module.css';

const features = [
  {
    title: 'Verifiable Knowledge',
    description: 'Every page you visit becomes structured, verifiable data — a proof of your interests, skills, and behavior.',
    icon: '/img/icon/shield-check.svg',
  },
  {
    title: 'Private by Design',
    description: 'Your data belongs only to you. Stored locally or on-chain under your control, never sold or centralized.',
    icon: '/img/icon/lock-check.svg',
  },
  {
    title: 'Personal AI',
    description: 'An intelligent assistant powered by GaiaNet and ElizaOS that learns from your real activity — and serves only you.',
    icon: '/img/icon/robot-love.svg',
  },
  {
    title: 'Trusted Connections',
    description: 'Discover people and content truly aligned with you, through transparent and validated links instead of algorithms.',
    icon: '/img/icon/hand-heart.svg',
  },
];

export default function KeyFeatures(): React.ReactElement {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.featuresBigTitle}>Key Features</h2>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <img
                src={feature.icon}
                alt={feature.title}
                className={styles.featureIcon}
              />
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
