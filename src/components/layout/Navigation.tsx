import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import siteData from '../../content/site.json';
import { MobileNav } from './MobileNav';

const DropdownNavItem: React.FC<{
  link: { label: string; path: string; children?: Array<{ label: string; path: string }> };
}> = ({ link }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive =
    link.children?.some((child) => location.pathname.startsWith(child.path)) ?? false;

  return (
    <li
      className={styles.dropdown}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className={`${styles.dropdownTrigger} ${isActive ? styles.active : ''}`}>
        {link.label}
      </span>
      {open && (
        <ul className={styles.dropdownMenu}>
          {link.children?.map((child) => (
            <li key={child.path}>
              <NavLink
                to={child.path}
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

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigation } = siteData;

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <NavLink to="/" className={styles.logo}>
            <img
              src="/logo/applied_logo_transparent.png"
              alt="Applied Engineering & Service"
              className={styles.logoImage}
            />
            <span className={styles.logoText}>{navigation.logo.fullText}</span>
          </NavLink>

          <ul className={styles.navLinks}>
            {navigation.links.map((link) =>
              link.children && link.children.length > 0 ? (
                <DropdownNavItem key={link.label} link={link} />
              ) : (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => (isActive ? styles.active : '')}
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            )}
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
