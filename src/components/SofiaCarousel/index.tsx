import React from 'react';
import styles from './index.module.css';

const sofiaImages = [
  { src: '/img/sofiascreen/Workspace-Sofia/hero-v1.png', alt: 'Control your data - Trust your network' },
  { src: '/img/sofiascreen/Workspace-Sofia/connectsocials.png', alt: 'Connect Your Socials - Earn XP - Level UP - Earn Gold' },
  { src: '/img/sofiascreen/Workspace-Sofia/rightwhereyoubrowse.png', alt: 'Trust signals right where you browse' },
  { src: '/img/sofiascreen/Workspace-Sofia/trendings.png', alt: 'Browse the latest Trendings' },
  { src: '/img/sofiascreen/Workspace-Sofia/proofofaction.png', alt: 'Turn your browsing into Proof of Action' },
  { src: '/img/sofiascreen/Workspace-Sofia/verifiedonchain.png', alt: 'Your browsing verified on-chain' },
  { src: '/img/sofiascreen/Workspace-Sofia/connectwithfriends.png', alt: 'Connect with friends - Share without sharing' },
];

export default function SofiaCarousel(): React.ReactElement {
  const infiniteImages = [...sofiaImages, ...sofiaImages, ...sofiaImages, ...sofiaImages];

  return (
    <div className={styles.carousel}>
      <div className={styles.scrollContainer}>
        <div className={styles.scrollTrack}>
          {infiniteImages.map((image, index) => (
            <div key={index} className={styles.imageSlide}>
              <img
                src={image.src}
                alt={image.alt}
                className={styles.carouselImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}