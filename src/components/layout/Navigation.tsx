import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import siteData from '../../content/site.json';
import { MobileNav } from './MobileNav';

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigation } = siteData;

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <NavLink to="/" className={styles.logo}>
            <div className={styles.logoIcon}>{navigation.logo.text}</div>
            <span className={styles.logoText}>{navigation.logo.fullText}</span>
          </NavLink>

          <ul className={styles.navLinks}>
            {navigation.links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.hamburger}></div>
          </button>
        </div>
      </nav>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
