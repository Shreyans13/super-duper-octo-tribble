import React from 'react';
import { useParams } from 'react-router-dom';
import { SectionLabel, StatCard, ProductGridCard } from '../components/ui';
import companyData from '../content/pages/company.json';
import type { CompanyProfileContent } from '../types/content';
import pageStyles from './Pages.module.css';
import styles from './CompanyProfilePage.module.css';

const CompanyProfilePage: React.FC = () => {
  const { companyId: _companyId } = useParams<{ companyId: string }>();
  const data = companyData as CompanyProfileContent;

  return (
    <>
      <section className={pageStyles.pageHeader}>
        <div className={pageStyles.container}>
          <SectionLabel>{data.header.sectionLabel}</SectionLabel>
          <h1 className={pageStyles.pageTitle}>{data.header.title}</h1>
          <p className={pageStyles.pageSubtitle}>{data.header.subtitle}</p>
        </div>
      </section>

      <section className={pageStyles.introSection}>
        <div className={pageStyles.container}>
          <h2 className={pageStyles.introHeading}>{data.overview.heading}</h2>
          {data.overview.paragraphs.map((paragraph, index) => (
            <p key={index} className={pageStyles.introParagraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={pageStyles.container}>
          <div className={styles.statsGrid}>
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
      </section>

      <section className={styles.productsSection}>
        <div className={pageStyles.container}>
          <div className={styles.sectionHeader}>
            <SectionLabel>{data.products.sectionLabel}</SectionLabel>
            <h2 className={styles.sectionTitle}>{data.products.title}</h2>
            <p className={styles.sectionSubtitle}>{data.products.subtitle}</p>
          </div>

          {data.products.groups.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.productGroup}>
              <h3 className={styles.groupTitle}>
                <span className={styles.groupIcon}>{group.icon}</span>
                {group.category}
              </h3>
              <div className={styles.productsGrid}>
                {group.items.map((item, itemIndex) => (
                  <ProductGridCard
                    key={itemIndex}
                    category={group.category}
                    name={item.name}
                    description={item.description}
                    tags={item.tags}
                    delay={(groupIndex * group.items.length + itemIndex) * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CompanyProfilePage;
