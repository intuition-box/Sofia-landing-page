import React from 'react';
import styles from './index.module.css';

const sofiaImages = [
  {
    src: '/img/sofiascreen/sofiascreenhomepage.png',
    alt: 'Sofia Homepage'
  },
  {
    src: '/img/sofiascreen/screensofiaprofil.png',
    alt: 'Sofia Profile View'
  },
  {
    src: '/img/sofiascreen/sofiascreenbookmarks.png',
    alt: 'Sofia Bookmarks'
  },
  {
    src: '/img/sofiascreen/sofiascreenechoes.png',
    alt: 'Sofia Echoes'
  },
  {
    src: '/img/sofiascreen/sofiascreenpulse.png',
    alt: 'Sofia Pulse'
  },
  {
    src: '/img/sofiascreen/sofiascreenpulsepng.png',
    alt: 'Sofia Pulse View'
  },
  {
    src: '/img/sofiascreen/sofiascreensettings.png',
    alt: 'Sofia Settings'
  },
  {
    src: '/img/sofiascreen/sofiascreensignal.png',
    alt: 'Sofia Signal'
  },
  {
    src: '/img/sofiascreen/sofiascreentriples.png',
    alt: 'Sofia Triples'
  }
];

export default function SofiaCarousel(): React.ReactElement {
  const duplicatedImages = [...sofiaImages, ...sofiaImages];

  return (
    <div className={styles.carousel}>
      <div className={styles.scrollContainer}>
        <div className={styles.scrollTrack}>
          {duplicatedImages.map((image, index) => (
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