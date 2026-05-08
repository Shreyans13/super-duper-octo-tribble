import React from 'react';
import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  children: React.ReactNode;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => {
  return <span className={styles.label}>{children}</span>;
};
