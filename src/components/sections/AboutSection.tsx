import React from 'react';
import styles from './AboutSection.module.css';
import { StatCard, SectionLabel } from '../ui';
import type { AboutSectionData } from '../../types/content';

interface AboutSectionProps {
  data: AboutSectionData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <SectionLabel>{data.sectionLabel}</SectionLabel>
            <h2 className={styles.title}>
              {data.title.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < data.title.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <div className={styles.paragraphs}>
              {data.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.stats}>
              {data.stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
          <div className={styles.visual}>
            <div className={styles.logoText}>{data.visual.logoText}</div>
            <ul className={styles.details}>
              {data.visual.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
