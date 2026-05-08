import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './PartnerLogo.module.css';

interface PartnerLogoProps {
  name: string;
  delay?: number;
}

export const PartnerLogo: React.FC<PartnerLogoProps> = ({ name, delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.logo} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.name}>{name}</span>
    </div>
  );
};
