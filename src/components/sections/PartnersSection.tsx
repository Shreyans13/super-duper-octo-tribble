import React, { useState } from 'react';
import styles from './PartnersSection.module.css';
import { PartnerLogo, SectionLabel } from '../ui';
import type { PartnersSectionData, ProductItem } from '../../types/content';

interface PartnersSectionProps {
  data: PartnersSectionData;
  products: ProductItem[];
}

const MiniProductCard: React.FC<{ product: ProductItem; index: number }> = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.miniProduct} style={{ animationDelay: `${index * 100}ms` }}>
      <div className={styles.miniProductImageWrap}>
        {!imageError && (
          <img
            src={product.image}
            alt={product.name}
            className={styles.miniProductImage}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {(!imageLoaded || imageError) && (
          <div className={styles.miniProductPlaceholder}>
            <span>{product.company.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
      </div>
      <span className={styles.miniProductCompany}>{product.company}</span>
    </div>
  );
};

export const PartnersSection: React.FC<PartnersSectionProps> = ({ data, products }) => {
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
              image={logo.image}
              alt={logo.alt}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Product Gallery Strip */}
        <div className={styles.productsStrip}>
          <p className={styles.productsLabel}>Products from our partners</p>
          <div className={styles.miniProductsGrid}>
            {products.map((product, index) => (
              <MiniProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
