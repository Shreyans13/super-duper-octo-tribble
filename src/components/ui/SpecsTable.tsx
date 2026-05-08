import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './SpecsTable.module.css';

interface SpecRow {
  model: string;
  capacity: string;
  stroke: string;
  pressure: string;
}

interface SpecsTableProps {
  headers: string[];
  rows: SpecRow[];
  footnotes: string[];
}

export const SpecsTable: React.FC<SpecsTableProps> = ({ headers, rows, footnotes }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className={`${styles.tableContainer} fade-in ${isVisible ? 'visible' : ''}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.model}</td>
              <td>{row.capacity}</td>
              <td>{row.stroke}</td>
              <td>{row.pressure}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.footnotes}>
        {footnotes.map((note, index) => (
          <p key={index} className={styles.footnote}>{note}</p>
        ))}
      </div>
    </div>
  );
};
