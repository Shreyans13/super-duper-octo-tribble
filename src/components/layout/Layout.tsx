import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};
