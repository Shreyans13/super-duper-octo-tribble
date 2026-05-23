import React, { useState } from 'react';
import styles from './OwnersSection.module.css';
import { SectionLabel } from '../ui';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface Owner {
  name: string;
  title: string;
  image: string;
  bio: string;
}

interface OwnersSectionProps {
  sectionLabel: string;
  title: string;
  description: string;
  owners: Owner[];
}

const OwnerCard: React.FC<{ owner: Owner; index: number }> = ({ owner, index }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      className={`${styles.ownerCard} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={styles.imageContainer}>
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
          <div className={styles.imagePlaceholder}>
            <span>{owner.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
        )}
      </div>
      <div className={styles.ownerInfo}>
        <h3 className={styles.ownerName}>{owner.name}</h3>
        <p className={styles.ownerTitle}>{owner.title}</p>
        <p className={styles.ownerBio}>{owner.bio}</p>
      </div>
    </div>
  );
};

export const OwnersSection: React.FC<OwnersSectionProps> = ({
  sectionLabel,
  title,
  description,
  owners
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
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
