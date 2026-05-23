import React from 'react';
import { AboutFoundersSection, VisionMissionSection, CoreValuesSection, WhyChooseSection } from '../components/sections';
import aboutData from '../content/pages/about.json';
import type { AboutContent } from '../types/content';

const AboutPage: React.FC = () => {
  const data = aboutData as AboutContent;

  return (
    <>
      <AboutFoundersSection
        aboutData={data.about}
        owners={data.owners.owners}
      />

      <VisionMissionSection
        sectionLabel={data.visionMission.sectionLabel}
        title={data.visionMission.title}
        cards={data.visionMission.cards}
      />

      <CoreValuesSection
        sectionLabel={data.coreValues.sectionLabel}
        title={data.coreValues.title}
        values={data.coreValues.values}
      />

      <WhyChooseSection
        sectionLabel={data.whyChooseUs.sectionLabel}
        title={data.whyChooseUs.title}
        features={data.whyChooseUs.features}
      />
    </>
  );
};

export default AboutPage;
