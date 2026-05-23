import React from 'react';
import { ProductGridSection, ProductsCatalogSection } from '../components/sections';
import { SectionLabel, ProductScrollGallery } from '../components/ui';
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
        <ProductScrollGallery products={data.productsCatalog.items} />
      </section>
      <ProductGridSection
        header={data.header}
        categories={data.categories}
        partners={data.partners}
      />
      <ProductsCatalogSection
        sectionLabel={data.productsCatalog.sectionLabel}
        title={data.productsCatalog.title}
        description={data.productsCatalog.description}
        items={data.productsCatalog.items.slice(0, 4)}
      />
    </>
  );
};

export default ProductsPage;
