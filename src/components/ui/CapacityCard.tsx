import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './CapacityCard.module.css';

interface CapacityCardProps {
  tonnage: number;
  label: string;
  description: string;
  badge: {
    text: string;
    variant: 'available' | 'book-now' | 'limited';
  };
  delay?: number;
}

export const CapacityCard: React.FC<CapacityCardProps> = ({
  tonnage,
  label,
  description,
  badge,
  delay = 0
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const badgeClass = {
    'available': styles.available,
    'book-now': styles.bookNow,
    'limited': styles.limited
  }[badge.variant];

  return (
    <div
      ref={ref}
      className={`${styles.card} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={`${styles.badge} ${badgeClass}`}>{badge.text}</span>
      <div className={styles.tonnage}>
        {tonnage}<span>T</span>
      </div>
      <div className={styles.label}>{label}</div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
