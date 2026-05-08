import React from 'react';
import styles from './CapacityCardsSection.module.css';
import { CapacityCard, SpecsTable, SectionLabel } from '../ui';
import type { CapacityCardData, SpecRow } from '../../types/content';

interface CapacityCardsSectionProps {
  capacities: {
    sectionLabel: string;
    title: string;
    cards: CapacityCardData[];
  };
  specifications: {
    sectionLabel: string;
    title: string;
    table: {
      headers: string[];
      rows: SpecRow[];
    };
    footnotes: string[];
  };
}

export const CapacityCardsSection: React.FC<CapacityCardsSectionProps> = ({
  capacities,
  specifications
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>{capacities.sectionLabel}</SectionLabel>
          <h2 className={styles.title}>{capacities.title}</h2>
        </div>

        <div className={styles.cards}>
          {capacities.cards.map((card, index) => (
            <CapacityCard
              key={index}
              tonnage={card.tonnage}
              label={card.label}
              description={card.description}
              badge={card.badge}
              delay={index * 150}
            />
          ))}
        </div>

        <div className={styles.specsSection}>
          <div className={styles.header}>
            <SectionLabel>{specifications.sectionLabel}</SectionLabel>
            <h2 className={styles.title}>{specifications.title}</h2>
          </div>
          <SpecsTable
            headers={specifications.table.headers}
            rows={specifications.table.rows}
            footnotes={specifications.footnotes}
          />
        </div>
      </div>
    </section>
  );
};
