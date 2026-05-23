import React, { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './ProductItemCard.module.css';

interface ProductItemCardProps {
  name: string;
  image: string;
  company: string;
  description: string;
  delay?: number;
}

export const ProductItemCard: React.FC<ProductItemCardProps> = ({
  name,
  image,
  company,
  description,
  delay = 0
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      className={`${styles.card} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.imageContainer}>
        {!imageError && (
          <img
            src={image}
            alt={name}
            className={styles.image}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {(!imageLoaded || imageError) && (
          <div className={styles.placeholder}>
            <span>{name.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
        <span className={styles.companyBadge}>{company}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
