import React from 'react';
import { CapacityCardsSection } from '../components/sections';
import { SectionLabel } from '../components/ui';
import rentalsData from '../content/pages/rentals.json';
import type { RentalsContent } from '../types/content';
import styles from './Pages.module.css';

const RentalsPage: React.FC = () => {
  const data = rentalsData as RentalsContent;

  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <SectionLabel>{data.header.sectionLabel}</SectionLabel>
          <h1 className={styles.pageTitle}>{data.header.title}</h1>
          <p className={styles.pageSubtitle}>{data.header.subtitle}</p>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <h2 className={styles.introHeading}>{data.intro.heading}</h2>
          {data.intro.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.introParagraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <CapacityCardsSection
        capacities={data.capacities}
        specifications={data.specifications}
      />
    </>
  );
};

export default RentalsPage;
