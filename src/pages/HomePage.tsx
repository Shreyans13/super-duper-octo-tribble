import React from 'react';
import { HeroSection, AboutSection, PartnersSection, ClientsSection } from '../components/sections';
import homeData from '../content/pages/home.json';
import productsData from '../content/pages/products.json';
import type { HomeContent, ProductsContent } from '../types/content';

const HomePage: React.FC = () => {
  const data = homeData as HomeContent;
  const products = (productsData as ProductsContent).productsCatalog;

  // Assign unique products to each section to avoid duplicates
  // Total products: 49 (Boyd 0-9, Fluid 10-15, JK 16-25, NewPig 26-36, Stanley 37-42, Wurth 43-48)

  // HeroSection: One product from each company category (6 products)
  const heroProducts = [
    products.items[0],   // Boyd Inc.
    products.items[10],  // Fluid Controls
    products.items[16],  // JKET Chennai
    products.items[26],  // New Pig India
    products.items[37],  // Stanley Black & Decker
    products.items[43],  // Würth
  ].filter(Boolean);

  // AboutSection: Use different products - mix from different companies (4 products)
  // Using indices that don't overlap with hero: 1, 11, 17, 27
  const aboutProducts = [
    products.items[1],   // Boyd (different from hero)
    products.items[11],  // Fluid (different from hero)
    products.items[17],  // JK (different from hero)
    products.items[27],  // New Pig (different from hero)
  ].filter(Boolean);

  // PartnersSection: Different products (4 products)
  // Using indices that don't overlap: 2, 12, 18, 38
  const partnersProducts = [
    products.items[2],   // Boyd
    products.items[12],  // Fluid
    products.items[18],  // JK
    products.items[38],  // Stanley
  ].filter(Boolean);

  // ClientsSection: Different products (4 products)
  // Using indices that don't overlap: 3, 13, 19, 39
  const clientsProducts = [
    products.items[3],   // Boyd
    products.items[13],  // Fluid
    products.items[19],  // JK
    products.items[39],  // Stanley
  ].filter(Boolean);

  return (
    <>
      <HeroSection data={data.hero} products={heroProducts} />
      <AboutSection data={data.about} products={aboutProducts} />
      <PartnersSection data={data.partners} products={partnersProducts} />
      <ClientsSection data={data.clients} products={clientsProducts} />
    </>
  );
};

export default HomePage;
