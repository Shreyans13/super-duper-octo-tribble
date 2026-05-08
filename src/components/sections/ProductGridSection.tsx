import React from 'react';
import styles from './ProductGridSection.module.css';
import { ProductCard, SectionLabel } from '../ui';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { ProductCategory, PartnerDetail } from '../../types/content';

interface ProductGridSectionProps {
  header: {
    sectionLabel: string;
    title: string;
    subtitle: string;
  };
  categories: ProductCategory[];
  partners: {
    sectionLabel: string;
    title: string;
    description: string;
    list: PartnerDetail[];
  };
}

const PartnerCard: React.FC<PartnerDetail & { delay: number }> = ({
  name,
  description,
  products,
  delay
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.partnerCard} fade-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h4 className={styles.partnerName}>{name}</h4>
      <p className={styles.partnerDescription}>{description}</p>
      <div className={styles.partnerProducts}>
        {products.map((product, index) => (
          <span key={index} className={styles.productTag}>{product}</span>
        ))}
      </div>
    </div>
  );
};

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  header,
  categories,
  partners
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>{header.sectionLabel}</SectionLabel>
          <h2 className={styles.title}>{header.title}</h2>
          <p className={styles.subtitle}>{header.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {categories.map((category, index) => (
            <ProductCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              items={category.items}
              delay={index * 100}
            />
          ))}
        </div>

        <div className={styles.partnersSection}>
          <div className={styles.header}>
            <SectionLabel>{partners.sectionLabel}</SectionLabel>
            <h2 className={styles.title}>{partners.title}</h2>
            <p className={styles.subtitle}>{partners.description}</p>
          </div>
          <div className={styles.partnerList}>
            {partners.list.map((partner, index) => (
              <PartnerCard key={index} {...partner} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
