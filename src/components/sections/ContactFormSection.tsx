import React, { useState } from 'react';
import styles from './ContactFormSection.module.css';
import type { FormField } from '../../types/content';

interface ContactFormSectionProps {
  heading: string;
  fields: FormField[];
  submitButton: string;
  successMessage: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  heading,
  fields,
  submitButton,
  successMessage
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.successMessage}>
            <h3>Thank You!</h3>
            <p>{successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.heading}>{heading}</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className={styles.field}>
              <label className={styles.label} htmlFor={field.name}>
                {field.label}
                {field.required && <span style={{ color: 'var(--copper-bronze)' }}> *</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  className={styles.textarea}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  className={styles.select}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  className={styles.input}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
            </div>
          ))}
          <button type="submit" className={styles.submitButton}>
            {submitButton}
          </button>
        </form>
      </div>
    </section>
  );
};
