import React from 'react';
import styles from './HeroSection.module.css';
import { Button } from '../ui';
import type { HeroSectionData } from '../../types/content';

interface HeroSectionProps {
  data: HeroSectionData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const renderHeadline = (text: string) => {
    return text.replace(/\{highlight\}(.*?)\{\/highlight\}/g, '<span class="$highlight">$1</span>');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>{data.badge}</span>
          <h1 className={styles.headline}>
            {data.headline.map((line, index) => (
              <React.Fragment key={index}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: line.replace(/\{highlight\}(.*?)\{\/highlight\}/g, '<span class="' + styles.highlight + '">$1</span>')
                  }}
                />
                {index < data.headline.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className={styles.subtitle}>{data.subtitle}</p>
          <div className={styles.buttons}>
            {data.buttons.map((button, index) => (
              <Button key={index} variant={button.variant} to={button.path}>
                {button.label}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.locationBadge}>{data.locationBadge}</div>
      </div>

      {data.decor.showGears && (
        <div className={styles.decorations}>
          <div className={styles.gear} />
          <div className={styles.gearReverse} />
        </div>
      )}

      {data.decor.cornerAccents && (
        <>
          <div className={`${styles.corner} ${styles.cornerTopLeft}`} />
          <div className={`${styles.corner} ${styles.cornerBottomRight}`} />
        </>
      )}
    </section>
  );
};
