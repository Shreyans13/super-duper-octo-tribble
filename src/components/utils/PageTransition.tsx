import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styles from './PageTransition.module.css';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={styles.pageTransition}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.25,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
