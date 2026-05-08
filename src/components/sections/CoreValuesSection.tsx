import React from 'react';
import styles from './CoreValuesSection.module.css';
import { ValueCard, SectionLabel } from '../ui';
import type { CoreValue } from '../../types/content';

interface CoreValuesSectionProps {
  sectionLabel: string;
  title: string;
  values: CoreValue[];
}

export const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({
  sectionLabel,
  title,
  values
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.values}>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
