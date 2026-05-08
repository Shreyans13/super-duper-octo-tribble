import React from 'react';
import { HeroSection, AboutSection, PartnersSection } from '../components/sections';
import homeData from '../content/pages/home.json';
import type { HomeContent } from '../types/content';

const HomePage: React.FC = () => {
  const data = homeData as HomeContent;

  return (
    <>
      <HeroSection data={data.hero} />
      <AboutSection data={data.about} />
      <PartnersSection data={data.partners} />
    </>
  );
};

export default HomePage;
