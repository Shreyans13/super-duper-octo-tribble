import React, { useState } from 'react';
import styles from './ClientsSection.module.css';
import { PartnerLogo, SectionLabel } from '../ui';
import type { PartnersSectionData, ProductItem } from '../../types/content';

interface ClientsSectionProps {
  data: PartnersSectionData;
  products: ProductItem[];
}

const BackgroundProduct: React.FC<{ product: ProductItem; index: number }> = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const gridPositions = [
    { gridColumn: '1', gridRow: '1' },
    { gridColumn: '3', gridRow: '1' },
    { gridColumn: '2', gridRow: '2' },
    { gridColumn: '1', gridRow: '3' },
  ];

  const pos = gridPositions[index % gridPositions.length];

  return (
    <div
      className={styles.bgProduct}
      style={{
        ...pos,
        animationDelay: `${index * 200}ms`
      }}
    >
      {!imageError && (
        <img
          src={product.image}
          alt={product.name}
          className={styles.bgProductImage}
          style={{ opacity: imageLoaded ? 0.15 : 0 }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
      {(!imageLoaded || imageError) && (
        <div className={styles.bgProductPlaceholder}>
          <span>{product.company.substring(0, 2).toUpperCase()}</span>
        </div>
      )}
    </div>
  );
};

export const ClientsSection: React.FC<ClientsSectionProps> = ({ data, products }) => {
  return (
    <section className={styles.clients}>
      {/* Background Product Grid */}
      <div className={styles.bgProductsGrid}>
        {products.map((product, index) => (
          <BackgroundProduct key={index} product={product} index={index} />
        ))}
      </div>

      <div className={styles.container}>
        <SectionLabel>{data.sectionLabel}</SectionLabel>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.logos}>
          {data.logos.map((logo, index) => (
            <PartnerLogo
              key={index}
              name={logo.name}
              image={logo.image}
              alt={logo.alt}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
