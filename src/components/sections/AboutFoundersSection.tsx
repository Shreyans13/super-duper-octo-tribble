import React, { useState } from 'react';
import styles from './AboutFoundersSection.module.css';
import { StatCard, SectionLabel } from '../ui';
import type { AboutSectionData } from '../../types/content';

interface Owner {
  name: string;
  title: string;
  image: string;
  bio: string;
}

interface AboutFoundersSectionProps {
  aboutData: AboutSectionData;
  owners: Owner[];
}

const OwnerCard: React.FC<{ owner: Owner; index: number }> = ({ owner, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.ownerCard} style={{ animationDelay: `${index * 200}ms` }}>
      <div className={styles.ownerImageContainer}>
        {!imageError && (
          <img
            src={owner.image}
            alt={owner.name}
            className={styles.ownerImage}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {(!imageLoaded || imageError) && (
          <div className={styles.ownerPlaceholder}>
            <span>{owner.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
        )}
      </div>
      <div className={styles.ownerInfo}>
        <h4 className={styles.ownerName}>{owner.name}</h4>
        <p className={styles.ownerTitle}>{owner.title}</p>
        <p className={styles.ownerBio}>{owner.bio}</p>
      </div>
    </div>
  );
};

export const AboutFoundersSection: React.FC<AboutFoundersSectionProps> = ({
  aboutData,
  owners
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <SectionLabel>Who We Are</SectionLabel>
          <h2 className={styles.title}>ABOUT US & OUR FOUNDERS</h2>
        </div>

        {/* About Content */}
        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <div className={styles.paragraphs}>
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.stats}>
              {aboutData.stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
          <div className={styles.logoSection}>
            <img
              src="/logo/applied_logo_transparent.png"
              alt="Applied Engineering & Services"
              className={styles.logoImage}
            />
            <ul className={styles.details}>
              {aboutData.visual.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Founders Section */}
        <div className={styles.foundersHeader}>
          <h3 className={styles.foundersTitle}>Meet Our Leadership</h3>
          <p className={styles.foundersSubtitle}>The visionaries driving our success</p>
        </div>

        <div className={styles.ownersGrid}>
          {owners.map((owner, index) => (
            <OwnerCard key={index} owner={owner} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
