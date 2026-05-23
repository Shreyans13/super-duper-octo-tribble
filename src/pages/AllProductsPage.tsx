import React, { useState, useMemo } from 'react';
import { ProductItemCard, SectionLabel } from '../components/ui';
import productsData from '../content/pages/products.json';
import type { ProductItem } from '../types/content';
import styles from './AllProductsPage.module.css';

interface ProductsData {
  meta: {
    title: string;
    description: string;
  };
  productsCatalog: {
    items: ProductItem[];
  };
}

const AllProductsPage: React.FC = () => {
  const data = productsData as ProductsData;
  const products = data.productsCatalog.items;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  // Extract unique companies from products
  const companies = useMemo(() => {
    const companySet = new Set(products.map(p => p.company));
    return ['all', ...Array.from(companySet).sort()];
  }, [products]);

  // Filter products based on search and company filter
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCompany =
        selectedCompany === 'all' || product.company === selectedCompany;

      return matchesSearch && matchesCompany;
    });
  }, [products, searchQuery, selectedCompany]);

  // Group filtered products by company
  const groupedProducts = useMemo(() => {
    const groups: Record<string, ProductItem[]> = {};
    filteredProducts.forEach(product => {
      if (!groups[product.company]) {
        groups[product.company] = [];
      }
      groups[product.company].push(product);
    });
    return groups;
  }, [filteredProducts]);

  // Sort companies alphabetically for display
  const sortedCompanies = useMemo(() => {
    return Object.keys(groupedProducts).sort();
  }, [groupedProducts]);

  const getCompanyDisplayName = (company: string) => {
    if (company === 'all') return 'All Companies';
    return company;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCompany('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCompany !== 'all';

  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <SectionLabel>Product Catalog</SectionLabel>
          <h1 className={styles.pageTitle}>ALL PRODUCTS</h1>
          <p className={styles.pageSubtitle}>
            Browse our complete range of industrial equipment from leading manufacturers
          </p>
        </div>
      </section>

      <section className={styles.filterSection}>
        <div className={styles.container}>
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products, companies, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearButton}
              >
                ×
              </button>
            )}
          </div>

          {/* Company Filter Buttons */}
          <div className={styles.filterContainer}>
            <span className={styles.filterLabel}>Filter by Company:</span>
            <div className={styles.filterButtons}>
              {companies.map(company => (
                <button
                  key={company}
                  onClick={() => setSelectedCompany(company)}
                  className={`${styles.filterButton} ${
                    selectedCompany === company ? styles.active : ''
                  }`}
                >
                  {getCompanyDisplayName(company)}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className={styles.activeFilters}>
              <span className={styles.resultsCount}>
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? 's' : ''}
              </span>
              <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.productsSection}>
        <div className={styles.container}>
          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <p>No products found matching your criteria.</p>
              <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                Clear filters
              </button>
            </div>
          ) : (
            sortedCompanies.map(company => (
              <div key={company} className={styles.companySection}>
                <h2 className={styles.companyTitle}>{company}</h2>
                <div className={styles.productsGrid}>
                  {groupedProducts[company].map((product, index) => (
                    <ProductItemCard
                      key={`${product.name}-${index}`}
                      name={product.name}
                      image={product.image}
                      company={product.company}
                      description={product.description}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default AllProductsPage;
