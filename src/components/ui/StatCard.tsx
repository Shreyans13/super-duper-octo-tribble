import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './StatCard.module.css';

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.card} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.number}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};
