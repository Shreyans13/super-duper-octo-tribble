import React from 'react';
import { ContactInfoSection, ContactFormSection } from '../components/sections';
import { SectionLabel } from '../components/ui';
import contactData from '../content/pages/contact.json';
import type { ContactContent } from '../types/content';
import styles from './Pages.module.css';

const ContactPage: React.FC = () => {
  const data = contactData as ContactContent;

  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <SectionLabel>{data.header.sectionLabel}</SectionLabel>
          <h1 className={styles.pageTitle}>{data.header.title}</h1>
        </div>
      </section>

      <ContactInfoSection
        heading={data.info.heading}
        items={data.info.items}
      />

      <ContactFormSection
        heading={data.form.heading}
        fields={data.form.fields}
        submitButton={data.form.submitButton}
        successMessage={data.form.successMessage}
      />
    </>
  );
};

export default ContactPage;
