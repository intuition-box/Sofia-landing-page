import React from 'react';
import Layout from '@theme/Layout';
import BentoGrid from '@site/src/components/BentoGrid';
import KeyFeatures from '@site/src/components/KeyFeatures';
import styles from './index.module.css';

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Sofia"
      description="Empowering people and organizations to capture, verify, share and amplify knowledge across the web">

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <h1 className={styles.heroTitle}>From Surfing the Web to Owning It</h1>
          </div>
        </section>

        {/* Bento Grid Gallery */}
        <section className={styles.gallerySection}>
          <BentoGrid />
        </section>

        {/* Key Features */}
        <KeyFeatures />
      </main>
    </Layout>
  );
}
