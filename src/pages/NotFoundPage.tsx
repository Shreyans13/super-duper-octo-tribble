import React from 'react';
import { Button } from '../components/ui';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary" to="/">
          Return Home
        </Button>
      </div>
    </section>
  );
};

export default NotFoundPage;
