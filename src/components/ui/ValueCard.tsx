import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './ValueCard.module.css';

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.card} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.icon}>{icon}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
