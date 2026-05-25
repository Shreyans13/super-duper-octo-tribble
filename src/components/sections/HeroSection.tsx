import React, { useState } from 'react';
import styles from './HeroSection.module.css';
import { Button } from '../ui';
import type { HeroSectionData, ProductItem } from '../../types/content';

interface HeroSectionProps {
  data: HeroSectionData;
  products: ProductItem[];
}

const FloatingProduct: React.FC<{ product: ProductItem; index: number }> = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const positions = [
    { top: '10%', right: '5%', width: '130px' },
    { top: '35%', right: '12%', width: '110px' },
    { top: '60%', right: '3%', width: '140px' },
    { top: '20%', right: '22%', width: '100px' },
    { top: '50%', right: '25%', width: '120px' },
    { top: '75%', right: '18%', width: '110px' },
  ];

  const position = positions[index % positions.length];

  return (
    <div
      className={styles.floatingProduct}
      style={{
        ...position,
        animationDelay: `${index * 0.5}s`
      }}
    >
      <div className={styles.floatingProductInner}>
        {!imageError && (
          <img
            src={product.image}
            alt={product.name}
            className={styles.floatingProductImage}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {(!imageLoaded || imageError) && (
          <div className={styles.floatingProductPlaceholder}>
            <span>{product.name.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
        <span className={styles.floatingProductName}>{product.name}</span>
      </div>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ data, products }) => {
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

      {/* Floating Product Images - showcasing all categories */}
      <div className={styles.productShowcase}>
        {products.slice(0, 6).map((product, index) => (
          <FloatingProduct key={index} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};
