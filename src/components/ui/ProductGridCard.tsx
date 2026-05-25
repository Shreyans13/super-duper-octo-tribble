import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './ProductGridCard.module.css';

interface ProductGridCardProps {
  category: string;
  name: string;
  description: string;
  tags: string[];
  delay?: number;
}

export const ProductGridCard: React.FC<ProductGridCardProps> = ({
  category,
  name,
  description,
  tags,
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.card} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.categoryBadge}>{category}</span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
};
