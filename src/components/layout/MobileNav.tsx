import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './MobileNav.module.css';
import siteData from '../../content/site.json';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavItem: React.FC<{
  link: { label: string; path: string; children?: Array<{ label: string; path: string }> };
  onClose: () => void;
}> = ({ link, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  if (!link.children || link.children.length === 0) {
    return (
      <li>
        <NavLink
          to={link.path}
          onClick={onClose}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          {link.label}
        </NavLink>
      </li>
    );
  }

  const isActive = link.children.some((child) => location.pathname.startsWith(child.path));

  return (
    <li>
      <button
        className={`${styles.accordionTrigger} ${isActive ? styles.active : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        {link.label}
        <span className={`${styles.chevron} ${expanded ? styles.expanded : ''}`}>▼</span>
      </button>
      {expanded && (
        <ul className={styles.subMenu}>
          {link.children.map((child) => (
            <li key={child.path}>
              <NavLink
                to={child.path}
                onClick={onClose}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { navigation } = siteData;

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.navLinks}>
          {navigation.links.map((link) => (
            <MobileNavItem key={link.label} link={link} onClose={onClose} />
          ))}
        </ul>
      </div>
    </>
  );
};
