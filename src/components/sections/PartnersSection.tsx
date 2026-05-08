import React from 'react';
import styles from './PartnersSection.module.css';
import { PartnerLogo, SectionLabel } from '../ui';
import type { PartnersSectionData } from '../../types/content';

interface PartnersSectionProps {
  data: PartnersSectionData;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ data }) => {
  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        <SectionLabel>{data.sectionLabel}</SectionLabel>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.logos}>
          {data.logos.map((logo, index) => (
            <PartnerLogo
              key={index}
              name={logo.name}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
