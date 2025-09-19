import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SofiaCarousel from '@site/src/components/SofiaCarousel';
import styles from './index.module.css';

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Sofia"
      description="Empowering people and organizations to capture, verify, share and amplify knowledge across the web">

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
          <p className={styles.sectionText}>
            <h1>Take back your Web</h1>
            </p>
            <SofiaCarousel />

          </div>
        </section>
        
            {/* Manifesto Button */}
            <div className={styles.manifestoSection}>
              <Link
                to="/manifesto"
                className={styles.manifestoButton}
              >
                Read Manifesto
              </Link>
            </div>
      </main>
    </Layout>
  );
}
