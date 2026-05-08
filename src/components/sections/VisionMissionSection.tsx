import React from 'react';
import styles from './VisionMissionSection.module.css';
import { SectionLabel } from '../ui';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { VisionMissionCard } from '../../types/content';

interface VisionMissionSectionProps {
  sectionLabel: string;
  title: string;
  cards: VisionMissionCard[];
}

const VisionMissionCardComponent: React.FC<VisionMissionCard & { delay: number }> = ({
  icon,
  title,
  content,
  delay
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.card} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.icon}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({
  sectionLabel,
  title,
  cards
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <VisionMissionCardComponent
              key={index}
              {...card}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
