import { FC } from 'react';

import { addLeadingZero } from '../../utils/general';

import styles from './TimeCell.module.css';

interface TimeCellProps {
  value: number
  title: string
  size: "small" | "large"
}

const TimeCell: FC<TimeCellProps> = ({ value, title, size }) => {
  return (
    <div className={`${styles.container} ${size === "small" ? styles.containerSmall : ""}`}>
      <div className={`${styles.value} ${size === "large" ? styles.valueLarge : styles.valueSmall}`}>
        {addLeadingZero(value)}
      </div>
      <div className={`${styles.label} ${size === "large" ? styles.labelLarge : styles.labelSmall}`}>
        {title}
      </div>
    </div>
  );
}

export default TimeCell;