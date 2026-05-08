import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import siteData from '../../content/site.json';

export const Footer: React.FC = () => {
  const { footer } = siteData;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Applied Engineering</h3>
            <p>{footer.brandDescription}</p>
          </div>

          {footer.columns.map((column, index) => (
            <div key={index} className={styles.column}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{footer.copyright}</p>
          <span className={styles.tag}>{footer.bottomTag}</span>
        </div>
      </div>
    </footer>
  );
};
