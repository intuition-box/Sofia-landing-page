import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Sofia"
      description="Empowering people and organizations to capture, verify, share and amplify knowledge across the web">

      <main>
        {/* Manifesto Content */}
        <section className={styles.heroSection}>
          <div className="container">
            <article className={styles.manifestoArticle}>
              <h1 className={styles.sectionTitlemanifesto}>The Deadly Gale Across the Internet Desert</h1>

              <p className={styles.sectionTextmanifesto}>
                The web was once an oasis of freedom and innovative ideas, a place where knowledge circulated freely. Today, like the endless landscapes of the Sahara, it has become a harsh, unforgiving desert, ruled by dark powers: Amazon, Google, Meta, and their ilk.
              </p>

              <p className={styles.sectionTextmanifesto}>
                We wander through algorithmic dunes, endlessly scrolling through ads, Reels, and empty tweets, as if crossing a desert that saps our strength. These giants harvest and resell our data in the shadows, depriving us of control over our digital souls.
              </p>

              <p className={styles.sectionTextmanifesto}>
                Notices are whispered by bots, illusions like mirages shimmering on the horizon. And beyond the dunes lurk deeper horrors: deepfakes and fabricated realities, distorting the truth until we no longer know what is real.
              </p>

              <p className={styles.sectionTextmanifesto}>
                In this desert, it's easy to feel small, abandoned, and powerless. Alone, you can die of thirst under the burning sun of manipulation.
              </p>

              <h2 className={styles.sectionTitlemanifesto}>The need to survive.</h2>

              <p className={styles.sectionTextmanifesto}>
                It's not just frustration, it's a matter of survival. The content we consume is designed to confine us, not nourish us. We no longer have a digital sanctuary that unites us and reflects our true identities, values, and curiosity. The desert threatens to engulf the very spirit of the original web.
              </p>

              <h2 className={styles.sectionTitlemanifesto}>Transforming the desert's power into hope</h2>

              <p className={styles.sectionTextmanifesto}>
                The fiercest sands carve the mightiest souls. From the unforgiving desert, where two Tuareg rebels dared to spark a revolution, SOFIA was born—an ember of defiance that turned hardship into unshakable strength.
              </p>

              <p className={styles.sectionTextmanifesto}>
                A warm wind of hope now sweeps across the dunes—not fleeing the desert's wrath, but mastering its raw power. It seizes the very chains the giants forged—private data, endless scrolling, and manipulative algorithms—and reforges them into keys to liberation. What was once a prison becomes a vast horizon of freedom.
              </p>

              <h2 className={styles.sectionTitlemanifesto}>SOFIA and the Wind of Sands</h2>

              <p className={styles.sectionTextmanifesto}>
                Semantic Organization Fostering Intelligence Amplification is the warm wind of a new web:
              </p>

              <ul className={styles.manifestoList}>
                <li><strong>Collection:</strong> Your personal AI harvests knowledge in real time, transforming drifting data into life-giving water.</li>
                <li><strong>Verification and Sharing:</strong> Within your circle of trust, truths are separated from lies like sand is separated from spices.</li>
                <li><strong>Registration:</strong> Chain anchoring makes your knowledge untouchable, immutable like the deep desert itself.</li>
              </ul>

              <p className={styles.sectionTextmanifesto}>
                SOFIA transforms arid dunes into fertile soil, a web serving humanity, not the looming shadows of Silicon Valley. The desert may be vast and unforgiving, but its power, once tamed, can build a future where the web belongs to us all again.
              </p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}




