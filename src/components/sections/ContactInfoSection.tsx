import React from 'react';
import styles from './ContactInfoSection.module.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { ContactInfoItem } from '../../types/content';

interface ContactInfoSectionProps {
  heading: string;
  items: ContactInfoItem[];
}

const InfoCard: React.FC<ContactInfoItem & { delay: number }> = ({
  icon,
  title,
  lines,
  delay
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.infoCard} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.icon}>{icon}</span>
      <h4 className={styles.title}>{title}</h4>
      <ul className={styles.lines}>
        {lines.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  heading,
  items
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.heading}>{heading}</h3>
        <div className={styles.infoGrid}>
          {items.map((item, index) => (
            <InfoCard key={index} {...item} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};
