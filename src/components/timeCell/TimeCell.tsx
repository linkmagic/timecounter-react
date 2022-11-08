import { FC } from 'react';

import { addLeadingZero } from '../../utils/general';

import styles from './TimeCell.module.css';

interface TimeCellProps {
  value: number
  title: string
}

const TimeCell: FC<TimeCellProps> = ({ value, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.value}>{addLeadingZero(value)}</div>
      <div className={styles.label}>{title}</div>
    </div>
  );
}

export default TimeCell;