import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import { LogoReveal } from '../components/LogoReveal';
import { useContentReveal } from '../hooks/useContentReveal';

export default function Home(): React.ReactElement {
  const showContent = useContentReveal();

  return (
    <Layout
      title="Sofia"
      description="Empowering people and organizations to capture, verify, share and amplify knowledge across the web">

      {/* Hero Section with Logo Reveal */}
      <LogoReveal
        logoSrc="/img/logoBrut.png"
        logoAlt="Sofia Logo"
        className={styles.heroBanner}
      />

      {/* Content that appears after logo effect */}
      <div className={`content-after-logo ${showContent ? 'visible' : ''}`}>
        <main>
          {/* Hero Text Section */}
          <section className={styles.visionSection}>
            <div className="container">
            <img
              src="/img/logoBrut.png"
              alt="Sofia Logo"
              className={styles.heroLogo}
            />
              <p className={styles.sectionText}>
                Sofia has for mission to empower people and organizations to capture, verify, share and amplify knowledge across the web. We believe that information should be organized semantically, traceable, and accessible, so that anyone can turn scattered data into meaningful insight.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className={styles.visionSection}>
            <div className="container">
              <h2 className={styles.sectionTitle}>
                Our Vision
              </h2>
              <p className={styles.sectionText}>
                By combining AI agents, knowledge graphs, and Web3 verification, we aim to create a transparent and collaborative ecosystem where trustworthy knowledge flows freely.
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section className={styles.missionSection}>
            <div className="container">
              <h2 className={styles.sectionTitle}>
                Building the Future
              </h2>
              <p className={styles.sectionText}>
                Sofia is not just a tool—it's a step toward a future where navigating the internet means building reliable, connected, and intelligent understanding together.
              </p>
            </div>
          </section>

          {/* Problem Statement */}
          <section className={styles.problemSection}>
            <div className="container">
              <h2 className={styles.sectionTitle}>
                The Problem We Face
              </h2>
              <p className={styles.sectionText}>
                We spend hours scrolling aimlessly through feeds—ads, Reels, random tweets—without capturing anything meaningful.
              </p>
              <p className={styles.sectionText}>
                Today's web is not a quality space. Platforms prioritize content that captures our attention over content that enriches us. On Amazon, Netflix, or Google, reviews come from strangers, not from the people who know us best. Our real interests and trusted relationships remain invisible in these algorithms.
              </p>
            </div>
          </section>

          {/* Pain Points */}
          <section className={styles.painSection}>
            <div className="container">
              <h2 className={styles.sectionTitle}>
                The Disconnect
              </h2>
              <p className={styles.sectionText}>
                This disconnect creates frustration: we consume content calibrated to hold us back, not elevate us. We don't have a place where our browsing and discoveries become a true extension of who we are—a digital space that reflects our tastes, our network, and our curiosity.
              </p>
            </div>
          </section>

          {/* Solution */}
          <section className={styles.solutionSection}>
            <div className="container">
              <h2 className={styles.sectionTitle}>
                Sofia's Solution
              </h2>
              <p className={styles.sectionText}>
                This is the void Sofia wants to fill: to make the internet more human, more relevant, and more connected to our real relationships.
              </p>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
