import React from 'react';
import { VisionMissionSection, CoreValuesSection, WhyChooseSection } from '../components/sections';
import { SectionLabel } from '../components/ui';
import aboutData from '../content/pages/about.json';
import type { AboutContent } from '../types/content';
import styles from './Pages.module.css';

const AboutPage: React.FC = () => {
  const data = aboutData as AboutContent;

  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <SectionLabel>{data.visionMission.sectionLabel}</SectionLabel>
          <h1 className={styles.pageTitle}>About Us</h1>
        </div>
      </section>

      <VisionMissionSection
        sectionLabel={data.visionMission.sectionLabel}
        title={data.visionMission.title}
        cards={data.visionMission.cards}
      />

      <CoreValuesSection
        sectionLabel={data.coreValues.sectionLabel}
        title={data.coreValues.title}
        values={data.coreValues.values}
      />

      <WhyChooseSection
        sectionLabel={data.whyChooseUs.sectionLabel}
        title={data.whyChooseUs.title}
        features={data.whyChooseUs.features}
      />
    </>
  );
};

export default AboutPage;
