import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductsCatalogSection.module.css';
import { ProductItemCard, SectionLabel, Button } from '../ui';
import type { ProductItem } from '../../types/content';

interface ProductsCatalogSectionProps {
  sectionLabel: string;
  title: string;
  description: string;
  items: ProductItem[];
}

export const ProductsCatalogSection: React.FC<ProductsCatalogSectionProps> = ({
  sectionLabel,
  title,
  description,
  items
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{description}</p>
        </div>
        <div className={styles.grid}>
          {items.map((item, index) => (
            <ProductItemCard
              key={index}
              name={item.name}
              image={item.image}
              company={item.company}
              description={item.description}
              delay={index * 100}
            />
          ))}
        </div>
        <div className={styles.viewAllContainer}>
          <Link to="/products">
            <Button variant="primary">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
