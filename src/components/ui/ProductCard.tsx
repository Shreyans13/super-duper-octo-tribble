import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  icon: string;
  title: string;
  items: string[];
  delay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ icon, title, items, delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.card} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.icon}>{icon}</span>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.items}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
