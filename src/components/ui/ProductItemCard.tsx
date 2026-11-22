import React, { useEffect, useRef, useState } from 'react';
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
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Only offer "Read more" when the clamped text actually overflows
  useEffect(() => {
    const el = descriptionRef.current;
    if (!el || expanded) return;
    const check = () => setIsClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [description, expanded]);

  return (
    <div
      ref={ref}
      className={`${styles.card} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.imageContainer}>
        {image && !imageError && (
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
        <p
          ref={descriptionRef}
          className={`${styles.description} ${expanded ? '' : styles.clamped}`}
        >
          {description}
        </p>
        {(isClamped || expanded) && (
          <button
            type="button"
            className={styles.readMore}
            onClick={() => setExpanded(prev => !prev)}
            aria-expanded={expanded}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
};
