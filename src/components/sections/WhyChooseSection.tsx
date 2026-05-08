import React from 'react';
import styles from './WhyChooseSection.module.css';
import { FeatureCard, SectionLabel } from '../ui';
import type { WhyChooseFeature } from '../../types/content';

interface WhyChooseSectionProps {
  sectionLabel: string;
  title: string;
  features: WhyChooseFeature[];
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  sectionLabel,
  title,
  features
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              number={feature.number}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
