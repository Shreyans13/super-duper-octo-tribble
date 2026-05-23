import React, { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './PartnerLogo.module.css';

interface PartnerLogoProps {
  name: string;
  image?: string;
  alt?: string;
  delay?: number;
}

export const PartnerLogo: React.FC<PartnerLogoProps> = ({
  name,
  image,
  alt,
  delay = 0
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const showImage = image && imageLoaded && !imageError;
  const showPlaceholder = !showImage;

  return (
    <div
      ref={ref}
      className={`${styles.logo} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {image && (
        <img
          src={image}
          alt={alt || name}
          className={styles.image}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
      {showPlaceholder && (
        <span className={styles.name}>{name}</span>
      )}
    </div>
  );
};
