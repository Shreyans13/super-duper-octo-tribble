import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './ContactFormSection.module.css';
import type { FormField } from '../../types/content';

interface ContactFormSectionProps {
  heading: string;
  formspreeId: string;
  fields: FormField[];
  submitButton: string;
  successMessage: string;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  heading,
  formspreeId,
  fields,
  submitButton,
  successMessage
}) => {
  const [state, handleSubmit] = useForm(formspreeId);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (state.succeeded) {
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
                  pattern={field.pattern}
                  title={field.patternMessage}
                  value={formData[field.name] || ''}
                  onChange={(e) => {
                    e.target.setCustomValidity('');
                    handleChange(field.name, e.target.value);
                  }}
                  onInvalid={(e) => {
                    if (field.patternMessage && e.currentTarget.validity.patternMismatch) {
                      e.currentTarget.setCustomValidity(field.patternMessage);
                    }
                  }}
                />
              )}
              <ValidationError
                className={styles.error}
                prefix={field.label}
                field={field.name}
                errors={state.errors}
              />
            </div>
          ))}
          <ValidationError className={styles.error} errors={state.errors} />
          <button type="submit" className={styles.submitButton} disabled={state.submitting}>
            {state.submitting ? 'SENDING...' : submitButton}
          </button>
        </form>
      </div>
    </section>
  );
};
