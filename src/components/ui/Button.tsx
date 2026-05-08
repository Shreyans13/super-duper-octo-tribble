import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  to,
  onClick,
  type = 'button',
  className = ''
}) => {
  const buttonClass = `${styles.btn} ${styles[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};
