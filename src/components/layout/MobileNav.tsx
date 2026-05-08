import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MobileNav.module.css';
import siteData from '../../content/site.json';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { navigation } = siteData;

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.navLinks}>
          {navigation.links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={onClose}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
