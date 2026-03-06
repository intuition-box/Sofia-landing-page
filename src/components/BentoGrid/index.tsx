import React, { useState } from 'react';
import styles from './index.module.css';

const screenshots = [
  { src: '/img/sofiascreen/Workspace-Sofia/hero-v1.png', alt: 'Control your data - Trust your network', title: 'Sofia Overview' },
  { src: '/img/sofiascreen/Workspace-Sofia/connectsocials.png', alt: 'Connect Your Socials', title: 'Connect Your Socials' },
  { src: '/img/sofiascreen/Workspace-Sofia/rightwhereyoubrowse.png', alt: 'Trust signals right where you browse', title: 'Trust Signals' },
  { src: '/img/sofiascreen/Workspace-Sofia/trendings.png', alt: 'Browse the latest Trendings', title: 'Trendings' },
  { src: '/img/sofiascreen/Workspace-Sofia/proofofaction.png', alt: 'Turn your browsing into Proof of Action', title: 'Proof of Action' },
  { src: '/img/sofiascreen/Workspace-Sofia/verifiedonchain.png', alt: 'Your browsing verified on-chain', title: 'Verified On-Chain' },
  { src: '/img/sofiascreen/Workspace-Sofia/connectwithfriends.png', alt: 'Connect with friends', title: 'Connect with Friends' },
  { src: '/img/sofiascreen/Workspace-Sofia/Vote.png', alt: 'Vote on claims - Support or Oppose', title: 'Vote' }
];

export default function BentoGrid(): React.ReactElement {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % screenshots.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + screenshots.length) % screenshots.length);
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className={styles.bentoGrid}>
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className={`${styles.bentoItem} ${styles[`item${index + 1}`]}`}
            onClick={() => openModal(index)}
          >
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              className={styles.bentoImage}
              loading="lazy"
            />
            <div className={styles.bentoOverlay}>
              <span className={styles.bentoTitle}>{screenshot.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className={styles.modal} onClick={closeModal}>
          <button className={styles.closeButton} onClick={closeModal} aria-label="Close">
            ×
          </button>
          <button className={`${styles.navButton} ${styles.prevButton}`} onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous">
            ‹
          </button>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={screenshots[selectedImage].src}
              alt={screenshots[selectedImage].alt}
              className={styles.modalImage}
            />
          </div>
          <button className={`${styles.navButton} ${styles.nextButton}`} onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next">
            ›
          </button>
        </div>
      )}
    </>
  );
}
