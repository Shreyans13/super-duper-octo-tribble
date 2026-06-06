import React, { useState } from 'react';
import styles from './AboutSection.module.css';
import { StatCard, SectionLabel } from '../ui';
import type { AboutSectionData, ProductItem } from '../../types/content';

interface Owner {
  name: string;
  title: string;
  image: string;
  bio: string;
}

interface AboutSectionProps {
  data: AboutSectionData;
  products: ProductItem[];
  owners?: Owner[];
}

const ProductThumbnail: React.FC<{ product: ProductItem; index: number }> = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={styles.thumbnail}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {!imageError && (
        <img
          src={product.image}
          alt={product.name}
          className={styles.thumbnailImage}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
      {(!imageLoaded || imageError) && (
        <div className={styles.thumbnailPlaceholder}>
          <span>{product.company.substring(0, 2).toUpperCase()}</span>
        </div>
      )}
      <span className={styles.thumbnailCompany}>{product.company}</span>
    </div>
  );
};

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

export const AboutSection: React.FC<AboutSectionProps> = ({ data, products, owners }) => {
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
            <div className={styles.productGrid}>
              {products.map((product, index) => (
                <ProductThumbnail key={index} product={product} index={index} />
              ))}
            </div>
            <div className={styles.visualOverlay}>
              <img
                src="/logo/applied_logo_transparent.png"
                alt="Applied Engineering & Service"
                className={styles.logoImage}
              />
              <ul className={styles.details}>
                {data.visual.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Owners Section - Combined with About */}
        {owners && owners.length > 0 && (
          <div className={styles.ownersSection}>
            <div className={styles.ownersHeader}>
              <span className={styles.ownersLabel}>Leadership</span>
              <h3 className={styles.ownersTitle}>OUR FOUNDERS</h3>
              <p className={styles.ownersDescription}>Meet the visionary leaders behind our success</p>
            </div>
            <div className={styles.ownersGrid}>
              {owners.map((owner, index) => (
                <OwnerCard key={index} owner={owner} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
