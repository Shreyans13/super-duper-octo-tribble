import React from 'react';
import { ProductGridSection } from '../components/sections';
import { SectionLabel } from '../components/ui';
import productsData from '../content/pages/products.json';
import type { ProductsContent } from '../types/content';
import styles from './Pages.module.css';

const ProductsPage: React.FC = () => {
  const data = productsData as ProductsContent;

  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <SectionLabel>{data.header.sectionLabel}</SectionLabel>
          <h1 className={styles.pageTitle}>{data.header.title}</h1>
          <p className={styles.pageSubtitle}>{data.header.subtitle}</p>
        </div>
      </section>
      <ProductGridSection
        header={data.header}
        categories={data.categories}
        partners={data.partners}
      />
    </>
  );
};

export default ProductsPage;
